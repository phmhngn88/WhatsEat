using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;

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

    public async Task<List<CustomerStore>> GetStoreList(PagedRequest pagedRequest, Guid userId)
    {
        var stores = _context.CustomerStores.AsNoTracking().Where(cs => cs.CustomerId == userId).AsQueryable();
        var res = await PagedList<CustomerStore>.ToPagedList(stores, pagedRequest.PageNumber, pagedRequest.PageSize);

        return res;
    }

    public List<Photo> ConvertJsonToPhotos(string jsonPhotos)
    {
        jsonPhotos = jsonPhotos.Substring(1, jsonPhotos.Length - 2);
        List<Photo> result = JsonConvert.DeserializeObject<List<Photo>>(jsonPhotos);
        return result;
    }
}