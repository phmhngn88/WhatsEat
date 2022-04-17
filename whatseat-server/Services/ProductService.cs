using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;

namespace whatseat_server.Services;

public class ProductService
{
    private readonly WhatsEatContext _context;
    public ProductService(WhatsEatContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> FindAllProducts()
    {
        // TODO: sort, paginate
        return await _context.Products.Include(p => p.ProductImages).AsNoTracking().ToListAsync();
    }

    public async Task<Product> FindProductById(int productId)
    {
        return await _context.Products.Include(p => p.ProductImages).Include(p => p.Store).Include(p => p.Store).FirstOrDefaultAsync(p => p.ProductId == productId);
    }

    public async Task<PagedList<Product>> FullTextSearchProduct(ProductFilter productFilter)
    {
        IQueryable<Product> products = _context.Products.AsQueryable();
        if (!String.IsNullOrEmpty(productFilter.searchTerm))
        {
            products = _context.Products.FromSqlInterpolated($"select * from products where MATCH(name) against ({productFilter.searchTerm})");
        }

        switch (productFilter.sortDate)
        {
            case "asc":
                products = products.OrderBy(r => r.CreatedOn);
                break;
            case "desc":
                products = products.OrderByDescending(r => r.CreatedOn);
                break;
            default:
                break;
        }

        switch (productFilter.sortDate)
        {
            case "asc":
                products = products.OrderBy(r => r.CreatedOn);
                break;
            case "desc":
                products = products.OrderByDescending(r => r.CreatedOn);
                break;
            default:
                break;
        }

        switch (productFilter.sortTotalSell)
        {
            case "asc":
                products = products.OrderBy(r => r.TotalSell);
                break;
            case "desc":
                products = products.OrderByDescending(r => r.TotalSell);
                break;
            default:
                break;
        }

        switch (productFilter.sortPrice)
        {
            case "asc":
                products = products.OrderBy(r => r.BasePrice);
                break;
            case "desc":
                products = products.OrderByDescending(r => r.BasePrice);
                break;
            default:
                break;
        }

        if (productFilter.productTypes != null && productFilter.productTypes.Length > 0)
        {
            products = products.Where(p => productFilter.productTypes.Contains(p.ProductCategory.ProductCategoryId));
        }

        if (productFilter.inStockOnly)
        {
            products = products.Where(p => p.InStock > 0);
        }

        var res = await PagedList<Product>.ToPagedList(products.Include(p => p.ProductCategory).Include(p => p.Store), productFilter.PageNumber, productFilter.PageSize);

        return res;
    }

    public async Task<PagedList<Product>> Get8BestSellerProduct()
    {
        ProductFilter filter = new ProductFilter
        {
            sortTotalSell = "desc",
            PageNumber = 1,
            PageSize = 8
        };
        var products = await this.FullTextSearchProduct(filter);

        return products;
    }

    public List<List<Photo>> ConvertJsonToPhotos(string jsonPhotos)
    {
        List<List<Photo>> result = JsonConvert.DeserializeObject<List<List<Photo>>>(jsonPhotos);
        return result;
    }

    public async Task<PagedList<ProductReview>> GetAllProductReviews(PagedProductReviewRequest pagedRequest)
    {

        var product = _context.Products.FirstOrDefault(r => r.ProductId == pagedRequest.ProductId);
        var productReviews = _context.ProductReviews.AsNoTracking()
            .OrderByDescending(rr => rr.CreatedOn)
            .Include(rv => rv.Customer)
            .Where(rr => rr.Product == product);

        var res = await PagedList<ProductReview>.ToPagedList(productReviews, pagedRequest.PageNumber, pagedRequest.PageSize);
        return res;
    }
}