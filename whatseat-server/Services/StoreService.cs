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
        var res = await PagedList<CustomerStore>.ToPagedList(stores.Include(cs => cs.Store), pagedRequest.PageNumber, pagedRequest.PageSize);

        return res;
    }

    public List<Photo> ConvertJsonToPhotos(string jsonPhotos)
    {
        jsonPhotos = jsonPhotos.Substring(1, jsonPhotos.Length - 2);
        List<Photo> result = JsonConvert.DeserializeObject<List<Photo>>(jsonPhotos);
        return result;
    }

    public async Task<Store> FindStoreByStoreIdAsync(int storeId)
    {
        return await _context.Stores.FirstOrDefaultAsync(s => s.StoreId == storeId);
    }

    internal async Task<StoreReview> storeReview(StoreReviewRequest reviewRequest, Customer customer)
    {
        Store store = await FindStoreByStoreIdAsync(reviewRequest.StoreId);
        StoreReview review = new StoreReview
        {
            Rating = reviewRequest.Rating,
            CreatedOn = DateTime.UtcNow,
            Customer = customer,
            Store = store,
            Comment = reviewRequest.Comment
        };

        var addRes = await _context.StoreReviews.AddAsync(review);

        int reviewNum = await _context.StoreReviews
            .CountAsync(sr => reviewRequest.StoreId == sr.Store!.StoreId);
        int reviewSum = await _context.StoreReviews.Where(sr => reviewRequest.StoreId == sr.Store!.StoreId).SumAsync(sr => sr.Rating);

        store.AvgRating = (1f * reviewSum) / reviewNum;

        var changRes = await _context.SaveChangesAsync();


        return review;
    }

    public async Task<PagedList<StoreReview>> GetPagedStoreReview(PagedStoreReviewRequest reviewRequest)
    {
        Store store = await this.FindStoreByStoreIdAsync(reviewRequest.StoreId);

        var storeReviews = _context.StoreReviews.AsNoTracking().Include(sr => sr.Customer)
            .Where(sr => sr.Store!.StoreId == reviewRequest.StoreId).AsQueryable();

        return await PagedList<StoreReview>.ToPagedList(storeReviews, reviewRequest.PageNumber, reviewRequest.PageSize);
    }
}