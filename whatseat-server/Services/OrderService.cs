using System;
using System.Linq;
using whatseat_server.Constants;
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
    var orders = _context.Orders.AsNoTracking().Include(o => o.Customer).Include(o => o.PaymentMethod).Include(o => o.ShippingInfo)
    .Include(o => o.Store).Include(o => o.OrderDetails).Where(o => (o.Customer == customer));

    var orderList = await PagedList<Order>.ToPagedList(orders, request.PageNumber, request.PageSize);

    return orderList;
  }

  public async Task<Order> getOrderDetails(Customer customer, int orderId)
  {
    var order = await _context.Orders.AsNoTracking().Include(o => o.OrderDetails).Include(o => o.OrderStatusHistories).ThenInclude(h => h.OrderStatus)
    .Include(od => od.Customer).Include(od => od.Shipper).Include(od => od.ShippingInfo).Include(od => od.PaymentMethod)
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

  public async Task<List<OrderDetail>> getOrderDetails(Order order)
  {
    return await _context.OrderDetails.Include(od => od.Product).Where(od => od.Order == order).ToListAsync();
  }

  public async Task<Order> PayOrder(Order order)
  {
    var resOrder = await _context.Orders.FirstOrDefaultAsync(o => o == order);
    resOrder.IsPaid = true;
    await _context.SaveChangesAsync();
    return order;
  }

  public async Task<Order> FindOrderBySessionId(string id)
  {
    var res = await _context.PaymentSessions.Include(pm => pm.Order).FirstOrDefaultAsync(pm => pm.SessionId == id);
    return res.Order;
  }

  public async Task<Order> GetOrderByOrderIdAndCustomerId(int orderId, Guid userId)
  {
    return await _context.Orders.Include(o => o.Customer).Include(o => o.OrderDetails)
        .FirstOrDefaultAsync(o => o.OrderId == orderId && o.Customer!.CustomerId == userId);
  }

  public async Task<OrderStatusHistory> StoreAcceptOrder(Order order, string message)
  {
    OrderStatus acceptStatus = await GetOrderStatusByName(OrderStatusConstant.Accepted);
    OrderStatusHistory orderStatusHistory = new OrderStatusHistory
    {
      OrderStatus = acceptStatus,
      Order = order,
      Message = message,
      CreatedOn = DateTime.UtcNow,
      ByUser = false
    };

    await _context.OrderStatusHistories.AddAsync(orderStatusHistory);

    await _context.SaveChangesAsync();
    return orderStatusHistory;
  }

  public async Task<OrderStatus> GetOrderStatusByName(string status)
  {
    OrderStatus orderStatus = await _context.OrderStatuses
        .FirstOrDefaultAsync(os => os.Value.Equals(status));
    if (orderStatus is null)
    {
      OrderStatus orderStatusNew = new OrderStatus
      {
        Value = status
      };

      await _context.OrderStatuses.AddAsync(orderStatusNew);
      await _context.SaveChangesAsync();

      return orderStatusNew;
    }
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

  public async Task<Order> getOrderOrderId(int orderId)
  {
    return await _context.Orders.Include(o => o.Store).FirstOrDefaultAsync(o => o.OrderId == orderId);
  }

  public async Task<OrderStatusHistory> StoreCancelOrder(Order order, string message)
  {
    OrderStatus acceptStatus = await GetOrderStatusByName(OrderStatusConstant.Canceled);
    OrderStatusHistory orderStatusHistory = new OrderStatusHistory
    {
      OrderStatus = acceptStatus,
      Order = order,
      Message = message,
      CreatedOn = DateTime.UtcNow,
      ByUser = false
    };
    await _context.OrderStatusHistories.AddAsync(orderStatusHistory);

    await _context.SaveChangesAsync();
    return orderStatusHistory;
  }

  public async Task<OrderStatusHistory> OrderWaitAccept(Order order)
  {
    OrderStatus waitingStatus = await GetOrderStatusByName(OrderStatusConstant.Waiting);
    OrderStatusHistory orderStatusHistory = new OrderStatusHistory
    {
      OrderStatus = waitingStatus,
      Order = order,
      CreatedOn = DateTime.UtcNow,
      ByUser = false
    };

    await _context.OrderStatusHistories.AddAsync(orderStatusHistory);

    await _context.SaveChangesAsync();
    return orderStatusHistory;
  }

  public async Task<OrderStatusHistory> UpdateStatus(Order order, string status, bool byUser = false)
  {
    OrderStatus orderStatus = await GetOrderStatusByName(status);
    OrderStatusHistory orderStatusHistory = new OrderStatusHistory
    {
      OrderStatus = orderStatus,
      Order = order,
      CreatedOn = DateTime.UtcNow,
      ByUser = byUser
    };

    await _context.OrderStatusHistories.AddAsync(orderStatusHistory);

    await _context.SaveChangesAsync();
    return orderStatusHistory;
  }

  public async Task<PaymentSession> SavePaymentSession(int OrderId, string sessionId)
  {
    PaymentSession paymentSession = new PaymentSession
    {
      OrderId = OrderId,
      SessionId = sessionId
    };

    var res = await _context.PaymentSessions.AddAsync(paymentSession);
    await _context.SaveChangesAsync();

    return res.Entity;
  }

}