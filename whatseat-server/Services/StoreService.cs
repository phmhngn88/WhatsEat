using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;

namespace whatseat_server.Services;

public class StoreService
{
    private readonly WhatsEatContext _context;
    public StoreService(WhatsEatContext context)
    {
        _context = context;
    }

    public async Task<bool> IsLikeByUser(int storeId, Guid userId)
    {
        var customer = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(c => c.CustomerId.Equals(userId));
        var store = await _context.Stores.AsNoTracking().FirstOrDefaultAsync(s => s.StoreId == storeId);
        var customerStore = await _context.CustomerStores.AsNoTracking().FirstOrDefaultAsync(cs => cs.Customer == customer && cs.Store == store);

        return customerStore is not null;
    }

    public async Task<CustomerStore> GetCustomerStoreAsync(int storeId, Guid userId)
    {
        var customer = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(c => c.CustomerId.Equals(userId));
        var store = await _context.Stores.AsNoTracking().FirstOrDefaultAsync(s => s.StoreId == storeId);
        var customerStore = await _context.CustomerStores.AsNoTracking().FirstOrDefaultAsync(cs => cs.Customer == customer && cs.Store == store);

        return customerStore;
    }

    public async Task<Store> FindStoreByUserIdAndStoreIdAsync(Guid userId, int storeId)
    {
        return await _context.Stores.FirstOrDefaultAsync(
            (s) =>
                 s.StoreId == storeId && s.UserId == userId.ToString()
        );
    }
}