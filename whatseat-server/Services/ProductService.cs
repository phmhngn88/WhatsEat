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
        return await _context.Products.Include(p => p.ProductImages).FirstOrDefaultAsync(p => p.ProductId == productId);
    }

    public async Task<PagedList<Product>> FullTextSearchProduct(SearchParams searchParams)
    {
        var products = _context.Products.FromSqlInterpolated($"select * from products where MATCH(name) against ({searchParams.searchTerm})");

        var res = await PagedList<Product>.ToPagedList(products.Include(p => p.ProductCategory), searchParams.PageNumber, searchParams.PageSize);

        return res;
    }

    public List<List<Photo>> ConvertJsonToPhotos(string jsonPhotos)
    {
        List<List<Photo>> result = JsonConvert.DeserializeObject<List<List<Photo>>>(jsonPhotos);
        return result;
    }
}