using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using whatseat_server.Models;
using whatseat_server.Services;
using Order = whatseat_server.Models.Order;
using OrderService = whatseat_server.Services.OrderService;

namespace whatseat_server.Controllers;
[ApiController]
[Route("[controller]")]
public class WebhookController : Controller
{
    private readonly OrderService _orderService;
    public WebhookController(OrderService orderService)
    {
        _orderService = orderService;
    }
    [HttpPost]
    public async Task<IActionResult> Index() {
        System.Diagnostics.Debug.WriteLine("\n~~~~~~\nHIGI\n");
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        const string endpointSecret = "whsec_f66594e8f421794db8a502f5a5b427bdec5d1add0568fa7c883cce5fabd32048";
        try {
            var stripeEvent = EventUtility.ParseEvent(json);
            var signatureHeader = Request.Headers["Stripe-Signature"];

            stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, endpointSecret);

            if (stripeEvent.Type == Events.PaymentIntentSucceeded)
            {
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                System.Diagnostics.Debug.WriteLine($"\n ////////////\n{paymentIntent.Id}\n");
                Order order = await _orderService.FindOrderBySessionId(paymentIntent.Id);
                System.Diagnostics.Debug.WriteLine($"\n ////////////\n{order.OrderId}\n");
                await _orderService.PayOrder(order);

                return Ok();
            }
            Console.WriteLine("HIGI");
            return Ok();
        } catch (StripeException e) {
            Console.WriteLine("Error: {0}", e.Message);
            return BadRequest();
        }
        catch (Exception e) {
            return StatusCode(500);
        }
    }
}