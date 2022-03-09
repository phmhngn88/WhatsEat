namespace whatseat_server.Models.DTOs.Requests;

public class StoreRegistrationRequest
{
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public int ProvinceCode { get; set; }
    public int DistrictCode { get; set; }
    public int WardCode { get; set; }
    public string Description { get; set; }
}