using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;

namespace whatseat_server.Services;

public class OrderService
{
    private readonly WhatsEatContext _context;
    public OrderService(WhatsEatContext context)
    {
        _context = context;
    }

    public async Task<PagedList<Order>> GetUserPagedOrders(Customer customer, OrderPagedRequest request)
    {
        var orders = _context.Orders.AsNoTracking().Where(o => (o.Customer == customer));

        var orderList = await PagedList<Order>.ToPagedList(orders, request.PageNumber, request.PageSize);

        return orderList;
    }

    public async Task<Order> getOrderDetails(Customer customer, int orderId)
    {
        var order = await _context.Orders.AsNoTracking().Include(o => o.OrderDetails)
            .FirstOrDefaultAsync(o => o.Customer == customer && o.OrderId == orderId);
        return order;
    }

}