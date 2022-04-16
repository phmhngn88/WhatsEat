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
    private readonly OrderService _orderService;
    private readonly ILogger<CustomerController> _logger;
    public CustomerController(CustomerService customerService,
        ProductService productService,
        CartService cartService,
        OrderService orderService,
        ILogger<CustomerController> logger,
        WhatsEatContext context
    )
    {
        _orderService = orderService;
        _customerService = customerService;
        _productService = productService;
        _cartService = cartService;
        _context = context;
        _logger = logger;
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

        Dictionary<int, List<CartDetailRequest>> classifiedCarts = new Dictionary<int, List<CartDetailRequest>>();

        foreach (var productReq in request.ProductList)
        {
            var product = await _productService.FindProductById(productReq.ProductId);
            try
            {
                int storeId = product.Store.StoreId;

                if (product.InStock < productReq.Quantity)
                {
                    continue;
                }

                classifiedCarts[storeId].Add(productReq);
            }
            catch (NullReferenceException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        Order order = new Order
        {
            CreatedOn = DateTime.UtcNow,
            ShippingInfo = _context.ShippingInfos.FirstOrDefault(si => si.ShippingInfoId == request.ShippingInfoId),
            PaymentMethod = _context.PaymentMethods.FirstOrDefault(pm => pm.PaymentMethodId == request.PaymentMethodId),
            OrderDetails = new List<OrderDetail>()
        };


        foreach (var productReq in request.ProductList)
        {
            order.OrderDetails.Add(new OrderDetail
            {
                ProductId = productReq.ProductId,
                Quantity = productReq.Quantity,
                Price = productReq.Price
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

        List<RecipeRecipeType> recipeTypes = new List<RecipeRecipeType>();

        Recipe recipe = new Recipe
        {
            Name = request.Name,
            Description = request.Description,
            Serving = request.Serving,
            TotalTime = request.TotalTime,
            ThumbnailUrl = request.ThumbnailUrl,
            AvgRating = 0,
            TotalRating = 0,
            TotalView = 0,
            totalLike = 0,
            videoUrl = request.videoUrl,
            Creator = customer
        };

        foreach (var item in request.RecipeTypeIds)
        {
            var recipeType = await _context.RecipeTypes
            .FirstOrDefaultAsync(pc => pc.RecipeTypeId == item);

            RecipeRecipeType recipeRecipeType = new RecipeRecipeType
            {
                RecipeType = recipeType,
                Recipe = recipe
            };

            if (recipeType is not null)
            {
                recipeTypes.Add(recipeRecipeType);
            }
        }

        await _context.RecipeRecipeTypes.AddRangeAsync(recipeTypes);
        await _context.Recipes.AddAsync(recipe);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            message = "Success"
        });
    }
    [HttpGet]
    [Route("orders-list")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetOrders([FromQuery] OrderPagedRequest request)
    {
        try
        {
            Guid userId = new Guid(User.FindFirst("Id")?.Value);
            var customer = await _customerService.FindCustomerByIdAsync(userId);

            var orderList = await _orderService.GetUserPagedOrders(customer, request);

            return Ok(orderList);
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.Message);
            return Forbid();
        }
    }

    [HttpGet]
    [Route("order/{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetOrderDetails(int id)
    {
        try
        {
            Guid userId = new Guid(User.FindFirst("Id")?.Value);
            var customer = await _customerService.FindCustomerByIdAsync(userId);

            var order = await _orderService.getOrderDetails(customer, id);

            return Ok(order);
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.Message);
            return Forbid();
        }
    }
    // TODO:
    [HttpPut]
    [Route("order/{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> CancelOrder([FromBody] OrderStatusRequest request)
    {
        try
        {
            Guid userId = new Guid(User.FindFirst("Id")?.Value);
            var customer = await _customerService.FindCustomerByIdAsync(userId);

            var order = await _orderService.getOrderDetails(customer, request.OrderId);

            var OrderStatusHistory = await _orderService.GetLatestOrderStatus(order);

            if (_orderService.IsCancelable(OrderStatusHistory.OrderStatus.Value))
            {
                await _orderService.CancelOrder(customer, order, request.Message);
                var orderRes = await _orderService.getOrderDetails(customer, request.OrderId);
                return Ok(orderRes);
            }
            else
            {
                return BadRequest(
                    new
                    {
                        message = "Order cancelation failed"
                    }
                );
            }
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.Message);
            return Forbid();
        }
    }
}