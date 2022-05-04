using backend_dotnet_r06_mall.Contants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
public class StoreController : ControllerBase
{
    private readonly WhatsEatContext _context;
    private readonly StoreService _storeService;
    private readonly ProductService _productService;
    private readonly UserManager<IdentityUser> _userManager;

    public StoreController(
        WhatsEatContext context,
        StoreService storeService,
        UserManager<IdentityUser> userManager,
        ProductService productService
    )
    {
        _context = context;
        _storeService = storeService;
        _userManager = userManager;
        _productService = productService;
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

    [HttpPut]
    [Route("info")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = RoleConstants.Store)]
    public async Task<IActionResult> changeInfoStore([FromBody] StoreChangeInfoRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        Store store = await _context.Stores.FirstOrDefaultAsync(s => s.StoreId == request.StoreId && s.UserId == userId.ToString());
        if (store is null)
        {
            return Forbid();
        }

        store.StoreId = request.StoreId;
        store.Email = request.Email;
        store.ShopName = request.ShopName;
        store.PhoneNumber = request.PhoneNumber;
        store.Address = request.Address;
        store.ProvinceCode = request.ProvinceCode;
        store.DistrictCode = request.DistrictCode;
        store.WardCode = request.WardCode;
        store.Description = request.Description;


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

    [HttpGet]
    [Route("{storeId}/products")]
    public async Task<IActionResult> GetProductList(int storeId, [FromQuery] PagedRequest query)
    {
        ProductFilter filter = new ProductFilter
        {
            productStores = new int[] { storeId },
            PageNumber = query.PageNumber,
            PageSize = query.PageSize
        };

        var products = await _productService.FullTextSearchProduct(filter);

        var productRes = new List<ProductResponse>();
        foreach (var item in products)
        {
            productRes.Add(new ProductResponse
            {
                Images = _productService.ConvertJsonToPhotos(item.PhotoJson),
                ProductId = item.ProductId,
                Name = item.Name,
                InStock = item.InStock,
                BasePrice = item.BasePrice,
                Description = item.Description,
                WeightServing = item.WeightServing,
                TotalSell = item.TotalSell,
                ProductCategoryId = item.ProductCategory.ProductCategoryId,
                Store = item.Store,
                CreatedOn = item.CreatedOn,
                TotalView = await _productService.GetProductViews(item)
            });
        }
        var metadata = new
        {
            products.TotalCount,
            products.PageSize,
            products.CurrentPage,
            products.TotalPages,
            products.HasNext,
            products.HasPrevious
        };

        Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
        return Ok(productRes);
    }
}