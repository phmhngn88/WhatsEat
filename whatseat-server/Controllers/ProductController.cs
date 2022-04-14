using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;
using whatseat_server.Services;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace whatseat_server.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;
    private readonly CustomerService _customerService;
    private readonly WhatsEatContext _context;

    public ProductController(
        ProductService productService,
        WhatsEatContext context,
        CustomerService customerService
        )
    {
        _context = context;
        _productService = productService;
        _customerService = customerService;
    }

    [HttpGet]
    public async Task<IActionResult> SearchProduct([FromQuery] SearchParams searchParams)
    {
        var products = await _productService.FullTextSearchProduct(searchParams);

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
                CreatedOn = item.CreatedOn
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

    [HttpGet]
    [Route("{productId}", Name = "productId")]
    public async Task<IActionResult> GetProductDetails(int productId)
    {
        var item = await _productService.FindProductById(productId);
        return item is not null ? Ok(new ProductResponse
        {
            Images = _productService.ConvertJsonToPhotos(item.PhotoJson),
            ProductId = item.ProductId,
            Name = item.Name,
            InStock = item.InStock,
            BasePrice = item.BasePrice,
            Description = item.Description,
            WeightServing = item.WeightServing,
            TotalSell = item.TotalSell,
            ProductCategoryId = item.ProductCategory is not null ? item.ProductCategory.ProductCategoryId : -1,
            Store = item.Store,
            CreatedOn = item.CreatedOn
        }) : NotFound(new { message = "product not found" });
    }

    [HttpPost]
    [Route("review")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> PostReview([FromBody] ProductReviewRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        var product = await _productService.FindProductById(request.ProductId);
        ProductReview productReview = new ProductReview
        {
            Rating = request.Rating,
            Comment = request.Comment,
            CreatedOn = DateTime.UtcNow,
            Product = product,
            Customer = customer
        };

        var addRes = await _context.ProductReviews.AddAsync(productReview);
        var changRes = await _context.SaveChangesAsync();

        return Ok(new { message = "Success" });
    }

    [HttpGet]
    [Route("categories")]
    public async Task<IActionResult> GetCategories()
    {
        return Ok(await _context.ProductCategories.AsNoTracking().ToListAsync());
    }

    [HttpGet]
    [Route("payment-method")]
    public async Task<IActionResult> GetPaymentMethods()
    {
        return Ok(await _context.PaymentMethods.AsNoTracking().ToListAsync());
    }
}