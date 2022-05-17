using backend_dotnet_r06_mall.Contants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;
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
        var carts = await _cartService.GetPagedCartDetails(userId);
        return Ok(carts);
    }


    [HttpPut]
    [Route("cart")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> UpdateProductCart([FromBody] CartDetailRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var addResult = await _cartService.AddProductToCart(request.ProductId, userId, request.Quantity);
        return addResult.Success ? Ok(addResult) : BadRequest(addResult);
    }

    [HttpPost]
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

        Dictionary<int, Order> classifiedOrders = new Dictionary<int, Order>();

        foreach (var productReq in request.ProductList)
        {
            var product = await _productService.FindProductById(productReq.ProductId);
            if (product.InStock < productReq.Quantity)
            {
                return BadRequest(new
                {
                    productId = product.ProductId,
                    message = $"Insufficient quantity of in store {product.Name}"
                });
            }
            try
            {
                int storeId = product.Store.StoreId;
                Order currentOrder;
                if (classifiedOrders.ContainsKey(storeId))
                {
                    currentOrder = classifiedOrders[storeId];
                }
                else
                {
                    currentOrder = new Order
                    {
                        Customer = await _customerService.FindCustomerByIdAsync(userId),
                        Store = product.Store,
                        OrderDetails = new List<OrderDetail>(),
                        CreatedOn = DateTime.UtcNow,
                        ShippingInfo = _context.ShippingInfos.FirstOrDefault(si => si.ShippingInfoId == request.ShippingInfoId),
                        PaymentMethod = _context.PaymentMethods.FirstOrDefault(pm => pm.PaymentMethodId == request.PaymentMethodId)
                    };
                    classifiedOrders.Add(storeId, currentOrder);
                }

                product.InStock -= productReq.Quantity;

                currentOrder.OrderDetails.Add(new OrderDetail
                {
                    ProductId = productReq.ProductId,
                    Quantity = productReq.Quantity,
                    Price = product.BasePrice
                });

            }
            catch (NullReferenceException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        foreach (var order in classifiedOrders)
        {
            _logger.LogInformation($"{order.Key}");
        }

        List<Order> orders = new List<Order>();
        Dictionary<int, Order>.ValueCollection values = classifiedOrders.Values;
        foreach (var val in values)
        {
            orders.Add(val);
        }

        await _context.Orders.AddRangeAsync(orders);
        await _context.SaveChangesAsync();


        return Ok(orders);
    }

    [HttpPost]
    [Route("shippingInfos")]
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
            ProvinceCode = request.ProvinceCode,
            Status = true
        });
        await _context.SaveChangesAsync();
        return Ok(new
        {
            message = "Success"
        });
    }

    [HttpGet]
    [Route("shippingInfos")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetShippingInfo()
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);

        var customer = await _customerService.FindCustomerByIdAsync(userId);

        List<ShippingInfo> shippingInfos = await _customerService.GetCustomerShippingInfos(customer);
        return Ok(shippingInfos);
    }

    [HttpDelete]
    [Route("shippingInfos/{shippingId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> DeleteShippingInfo(int shippingId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);

        var customer = await _customerService.FindCustomerByIdAsync(userId);

        ShippingInfo shippingInfo = await _customerService.GetCustomerShippingInfosById(customer, shippingId);

        if (shippingInfo is null) return Forbid();

        shippingInfo.Status = false;

        await _context.SaveChangesAsync();
        return NoContent();
    }
    [HttpPut]
    [Route("shippingInfos/{shippingId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> EditShippingInfo(int shippingId, [FromBody] ShippingInfoRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);

        var customer = await _customerService.FindCustomerByIdAsync(userId);

        ShippingInfo shippingInfo = await _customerService.GetCustomerShippingInfosById(customer, shippingId);

        if (shippingInfo is null) return Forbid();

        shippingInfo.WardCode = request.WardCode;
        shippingInfo.PhoneNumber = request.PhoneNumber;
        shippingInfo.DistrictCode = request.DistrictCode;
        shippingInfo.Address = request.Address;
        shippingInfo.ProvinceCode = request.ProvinceCode;
        await _context.SaveChangesAsync();
        return Ok(shippingInfo);
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
        System.Diagnostics.Debug.WriteLine("HIGI");
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

    [HttpGet]
    [Route("get-calo-per-day")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> AddCaloPerDay()
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);

        return Ok(customer.KcalPerDay);
    }

    [HttpPut]
    [Route("update-calo-per-day")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> UpdateCaloPerDay([FromBody] AddCaloRequest request)
    {
        var now = DateTime.Now;
        var birthDay = DateTime.Parse(request.Year);
        var age = now.Year - birthDay.Year;
        Guid userId = new Guid(User.FindFirst("Id")?.Value);

        var brm = request.Gender == "male" ?
            66 + (6.3 * request.Weight * 2.20462262) + (12.9 * request.Height * 0.393700787) + (6.8 * age) :
            66.5 + (4.3 * request.Weight * 2.20462262) + (4.7 * request.Height * 0.393700787) + (4.7 * age);

        var calorie = (float)Math.Round(brm * float.Parse(request.PAL), 2);

        var customer = await _customerService.FindCustomerByIdAsync(userId);
        if (customer.KcalPerDay == 0)
        {
            customer.KcalPerDay = calorie;
        }

        await _context.SaveChangesAsync();

        return Ok(calorie);
    }


    [HttpGet]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = RoleConstants.Customer)]
    public async Task<IActionResult> GetCustomerInfo()
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        return Ok(customer);
    }
    [HttpPut]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = RoleConstants.Customer)]
    public async Task<IActionResult> EditCustomerInfo([FromBody] CustomerInfoRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        customer.AvatarUrl = request.AvatarUrl;
        customer.Email = request.Email;
        customer.IDCard = request.IdCard;
        customer.Name = request.Name;

        await _context.SaveChangesAsync();
        return Ok(customer);
    }

    [HttpGet]
    [Route("{userId}")]
    public async Task<IActionResult> GetCustomerInfo(string userId)
    {
        Guid userIdNew = new Guid(userId);
        var customer = await _customerService.FindCustomerByIdAsync(userIdNew);
        return Ok(customer);
    }
}