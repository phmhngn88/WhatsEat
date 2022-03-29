using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Services;

namespace whatseat_server.Controllers;
[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly CustomerService _customerService;
    private readonly ProductService _productService;
    private readonly CartService _cartService;
    private readonly WhatsEatContext _context;
    public CustomerController(CustomerService customerService,
        ProductService productService,
        CartService cartService,
        WhatsEatContext context
    )
    {
        _customerService = customerService;
        _productService = productService;
        _cartService = cartService;
        _context = context;
    }

    [HttpGet]
    [Route("cart")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetCartDetails()
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var cartList = await _context.CartDetails.AsNoTracking().OrderByDescending(cd => cd.CreatedOn).ToListAsync();
        return Ok(cartList);
    }


    [HttpPut]
    [Route("cart")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> AddProductToCart([FromBody] CartDetailRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var addResult = await _cartService.AddProductToCart(request.ProductId, userId, request.Quantity);
        return addResult.Success ? Ok(addResult) : BadRequest(addResult);
    }

    [HttpDelete]
    [Route("cart/{productId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> DeleteProductFromCart(int productId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var deleteRes = await _cartService.RemoveById(userId, productId);
        if (deleteRes)
        {
            return Ok(
                new
                {
                    message = $"{productId} has been removed from your cart"
                }
            );
        }
        else
        {
            return BadRequest(

                new
                {
                    message = "Delete failed"
                }
            );
        }
    }

    [HttpPost]
    [Route("order")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> AddOrder([FromBody] OrderRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        Order order = new Order
        {
            CreatedOn = DateTime.UtcNow,
            ShippingInfo = _context.ShippingInfos.FirstOrDefault(si => si.ShippingInfoId == request.ShippingInfoId),
            PaymentMethod = _context.PaymentMethods.FirstOrDefault(pm => pm.PaymentMethodId == request.PaymentMethodId),
            OrderDetails = new List<OrderDetail>()
        };

        foreach (var productRes in request.ProductList)
        {
            order.OrderDetails.Add(new OrderDetail
            {
                ProductId = productRes.ProductId,
                Quantity = productRes.Quantity,
                Price = productRes.Price
            });
        }
        var newOrder = await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        if (newOrder is not null)
        {
            return Ok(order);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPost]
    [Route("add-shipping-info")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> AddShippingInfo([FromBody] ShippingInfoRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);

        var customer = await _customerService.FindCustomerByIdAsync(userId);
        if (customer.ShippingInfos is null)
        {
            customer.ShippingInfos = new List<ShippingInfo>();
        }

        customer.ShippingInfos.Add(new ShippingInfo
        {
            WardCode = request.WardCode,
            PhoneNumber = request.PhoneNumber,
            DistrictCode = request.DistrictCode,
            Address = request.Address,
            ProvinceCode = request.ProvinceCode
        });
        await _context.SaveChangesAsync();
        return Ok(new
        {
            message = "Success"
        });
    }

    [HttpPost]
    [Route("add-recipe")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> AddRecipe([FromBody] AddRecipeRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);

        var recipeType = await _context.RecipeTypes
            .FirstOrDefaultAsync(pc => pc.RecipeTypeId == request.RecipeTypeId);

        Recipe recipe = new Recipe
        {
            Name = request.Name,
            Description = request.Description,
            Serving = request.Serving,
            TotalTime = request.TotalTime,
            ThumbnailUrl = request.ThumbnailUrl,
            RecipeType = recipeType
        };

        await _context.Recipes.AddAsync(recipe);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            message = "Success"
        });
    }
}