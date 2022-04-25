namespace whatseat_server.Models.DTOs.Requests;

public class ProductFilter : PagedRequest
{
    public string searchTerm { get; set; }
    public string sortDate { get; set; }
    public string sortTotalSell { get; set; }
    public string sortPrice { get; set; }
    public bool inStockOnly { get; set; }
    public int[] productTypes { get; set; }
    public int[] productStores { get; set; }

}