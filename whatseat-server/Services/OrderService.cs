using System;
using System.Linq;
using backend_dotnet_r06_mall.Contants;
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

    public async Task<Order> CancelOrder(Customer customer, Order order, string message)
    {
        OrderStatus canceledStatus = await GetOrderStatusByName(OrderStatusConstant.Canceled);
        OrderStatusHistory orderStatusHistory = new OrderStatusHistory
        {
            OrderStatus = canceledStatus,
            Order = order,
            Message = message,
            CreatedOn = DateTime.UtcNow,
            ByUser = true
        };

        await _context.SaveChangesAsync();
        var res = await getOrderDetails(customer, order.OrderId);
        return res;
    }

    public async Task<OrderStatus> GetOrderStatusByName(string status)
    {
        OrderStatus orderStatus = await _context.OrderStatuses
            .FirstOrDefaultAsync(os => os.Value.Equals(status));
        return orderStatus;
    }

    public async Task<OrderStatusHistory> GetLatestOrderStatus(Order order)
    {
        OrderStatusHistory latestStatus = await _context.OrderStatusHistories
            .Where(osh => osh.Order == order).OrderByDescending(osh => osh.CreatedOn)
            .FirstAsync();

        return latestStatus;
    }

    public bool IsCancelable(string status)
    {
        if (status.Equals(OrderStatusConstant.Canceled) || status.Equals(OrderStatusConstant.Shipping))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

}