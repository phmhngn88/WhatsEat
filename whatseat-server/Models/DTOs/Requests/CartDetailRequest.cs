namespace whatseat_server.Models.DTOs.Requests;

public class CartDetailRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public int Price { get; set; }
}