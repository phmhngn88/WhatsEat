namespace whatseat_server.Models.DTOs.Requests;

public class OrderShippingFeeRequest
{
    public int FromDistrictId { get; set; }
    public int ToDistrictId { get; set; }
    public int ToWardCode { get; set; }
}