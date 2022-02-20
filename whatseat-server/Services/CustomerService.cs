using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;

namespace whatseat_server.Services;

public class CustomerService
{
    private readonly WhatsEatContext _context;
    public CustomerService(WhatsEatContext context)
    {
        _context = context;
    }

    public async Task<Customer> FindCustomerByIdAsync(Guid userId)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == userId);
        return customer;
    }
}