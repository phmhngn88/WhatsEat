using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using whatseat_server.Services;
using whatseat_server.Models;
using CustomerService = whatseat_server.Services.CustomerService;
using Customer = whatseat_server.Models.Customer;
using OrderService = whatseat_server.Services.OrderService;
using Order = whatseat_server.Models.Order;

namespace whatseat_server.Controllers;
[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase {
    private readonly CustomerService _customerService;
    private readonly OrderService _orderService;

    public PaymentController(CustomerService customerService, OrderService orderService)
    {
        _customerService = customerService;
        _orderService = orderService;
    }

    [HttpPost("{orderId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task< IActionResult> Create(int orderId) {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        Customer customer = await _customerService.FindCustomerByIdAsync(userId);

        Order order = await _orderService.GetOrderByOrderIdAndCustomerId(orderId, userId);

        if (order is null) return NotFound();

        List<OrderDetail> orderDetails = await _orderService.getOrderDetails(order);

        var LineItems = new List<SessionLineItemOptions>();

        foreach (var item in orderDetails)
        {
            LineItems.Add(new SessionLineItemOptions {
                    PriceData = new SessionLineItemPriceDataOptions {
                        Currency="vnd",
                        ProductData=new SessionLineItemPriceDataProductDataOptions  {
                            Name = item.Product.Name,
                        },
                        UnitAmount = item.Product.BasePrice
                    },
                    Quantity = item.Quantity,
                });
        }     

        var options = new SessionCreateOptions{
            LineItems = LineItems,
            Mode = "payment",
            SuccessUrl = "http://localhost:3000",
            CancelUrl = "http://localhost:3000"
        };

        var service = new SessionService();
        Session session = service.Create(options);

        PaymentSession paymentSession = await _orderService.SavePaymentSession(orderId, session.PaymentIntentId);

        // Response.Headers.Add("Location", session.Url);
        // return new StatusCodeResult(303);
        return Ok(session);
    }
}