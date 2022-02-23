namespace whatseat_server.Models.DTOs.Requests;

public class OrderRequest
{
    public int PaymentMethodId { get; set; }
    public int ShippingInfoId { get; set; }
    public List<CartDetailRequest> ProductList { get; set; }
}