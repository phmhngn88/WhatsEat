using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;

namespace whatseat_server.Services;

public class CartService
{
    private readonly WhatsEatContext _context;
    private readonly ProductService _productService;
    private readonly CustomerService _customerService;

    public CartService(WhatsEatContext context,
        ProductService productService,
        CustomerService customerService
    )
    {
        _context = context;
        _productService = productService;
        _customerService = customerService;

    }

    public async Task<AddToCartResponse> AddProductToCart(int productId, Guid userId, int quantity)
    {
        var product = await _productService.FindProductById(productId);

        var customer = await _customerService.FindCustomerByIdAsync(userId);

        if (product is null)
            return new AddToCartResponse
            {
                Success = false,
                Message = "Product not found"
            };

        var existingCartProduct = await _context.CartDetails.FirstOrDefaultAsync(cd => cd.ProductId == productId && cd.CustomerId.Equals(userId));

        if (existingCartProduct is not null)
        {
            existingCartProduct.Quantity += quantity;

            if (existingCartProduct.Quantity > product.InStock)
            {
                return new AddToCartResponse
                {
                    Success = false,
                    Message = "Quantity exceeded"
                };
            }

            existingCartProduct.CreatedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return new AddToCartResponse
            {
                Success = true,
                Message = "Success"
            };
        }

        var newCartDetail = new CartDetail
        {
            Product = product,
            Quantity = quantity,
            Customer = customer,
            CreatedOn = DateTime.UtcNow
        };
        await _context.CartDetails.AddAsync(newCartDetail);
        await _context.SaveChangesAsync();

        return new AddToCartResponse
        {
            Success = true,
            Message = "Success"
        };
    }

    public async Task<PagedList<CartDetail>> GetPagedCartDetails(PagedRequest request, Guid userId)
    {
        var cartList = _context.CartDetails.Include(cd => cd.Product).Where(cd => cd.CustomerId == userId).AsNoTracking().OrderByDescending(cd => cd.CreatedOn).AsQueryable();
        var res = await PagedList<CartDetail>.ToPagedList(cartList, request.PageNumber, request.PageSize);
        return res;
    }

    public async Task<bool> RemoveById(Guid customerId, int productId)
    {
        var cartDetail = _context.CartDetails.FirstOrDefault(cd => cd.CustomerId.Equals(customerId) && cd.ProductId == productId);
        var removeResult = _context.CartDetails.Remove(cartDetail);
        if (removeResult is not null)
        {
            await _context.SaveChangesAsync();
            return true;
        }
        else
        {
            return false;
        }
    }

}