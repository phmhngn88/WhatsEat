using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;

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
}