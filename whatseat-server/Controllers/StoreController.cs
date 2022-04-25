using backend_dotnet_r06_mall.Contants;
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
public class StoreController : ControllerBase
{
    private readonly WhatsEatContext _context;
    private readonly StoreService _storeService;
    public StoreController(
        WhatsEatContext context,
        StoreService storeService
    )
    {
        _context = context;
        _storeService = storeService;
    }

    [HttpGet]
    [Route("{storeId}")]
    public async Task<IActionResult> GetStoreInfo(int storeId)
    {
        return Ok(await _context.Stores.AsNoTracking().FirstOrDefaultAsync(s => s.StoreId == storeId));
    }

    [HttpGet]
    [Route("is-like/{storeId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetUserStoreLiking(int storeId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        return Ok(await _storeService.IsLikeByUser(storeId, userId));
    }

    [HttpPost]
    [Route("like/{storeId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> LikeStore(int storeId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        bool isLike = await _storeService.IsLikeByUser(storeId, userId);

        if (isLike)
        {
            return BadRequest(new { message = "Already like this store" });
        }
        else
        {
            var addRes = _context.CustomerStores.AddAsync(new CustomerStore
            {
                CustomerId = userId,
                StoreId = storeId,
                CreatedOn = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();
            return Ok(new { message = "Success" });
        }
    }

    [HttpDelete]
    [Route("dislike/{storeId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> DislikeStore(int storeId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customerStore = await _storeService.GetCustomerStoreAsync(storeId, userId);

        if (customerStore is not null)
        {
            _context.CustomerStores.Remove(customerStore);
            _context.SaveChanges();
            return Ok(new { message = "Success" });
        }
        else
        {
            return BadRequest(new { message = "Error" });
        }
    }

    [HttpGet]
    [Route("followings")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetFollowingStores([FromQuery] PagedRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);

        List<CustomerStore> stores = await _storeService.GetStoreList(request, userId);

        List<SimpleStoreResponse> simpleStoreResponses = new List<SimpleStoreResponse>();

        foreach (var item in stores)
        {
            simpleStoreResponses.Add(
                new SimpleStoreResponse
                {
                    ShopName = item.Store is not null ? item.Store.ShopName : null,
                    StoreId = item.StoreId,
                    AvatarUrl = item.Store is not null ? item.Store.AvatarUrl : null,
                    CreatedOn = item.CreatedOn
                }
            );
        }

        return Ok(simpleStoreResponses);
    }

    [HttpPost]
    [Route("register")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> StoreRegistration([FromBody] StoreRegistrationRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        Store newStore = new Store
        {
            Email = request.Email,
            ShopName = request.ShopName,
            PhoneNumber = request.PhoneNumber,
            Address = request.Address,
            ProvinceCode = request.ProvinceCode,
            DistrictCode = request.DistrictCode,
            WardCode = request.WardCode,
            Description = request.Description,
            UserId = userId.ToString()
        };

        await _context.Stores.AddAsync(newStore);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Success" });
    }

    [HttpPost]
    [Route("add-product")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = RoleConstants.Store)]
    public async Task<IActionResult> StoreAddProduct([FromBody] AddProductRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var store = await _storeService.FindStoreByUserIdAndStoreIdAsync(userId, request.StoreId);

        var productCategory = await _context.ProductCategories
            .FirstOrDefaultAsync(pc => pc.ProductCategoryId == request.ProductCategoryId);


        Product product = new Product
        {
            Name = request.Name,
            InStock = request.InStock,
            BasePrice = request.BasePrice,
            CreatedOn = DateTime.UtcNow,
            Store = store,
            ProductCategory = productCategory,
            Description = request.Description
        };

        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();

        return Ok(new { message = $"Success {userId}" });
    }

    [HttpGet]
    [Route("orders")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = RoleConstants.Store)]

    public async Task<IActionResult> TrackOrders()
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var orderList = await _context.OrderDetails.AsNoTracking().
            Where(od => od.Product.Store.UserId == userId.ToString()).ToListAsync();

        return Ok(orderList);

    }
}