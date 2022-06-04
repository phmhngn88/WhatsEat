namespace whatseat_server.Models.DTOs.Requests;

public class OrderCreateRequest : OrderRequest
{
    public int PaymentMethodId { get; set; }
    public int ShippingInfoId { get; set; }
}