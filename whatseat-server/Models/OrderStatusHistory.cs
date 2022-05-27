using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace whatseat_server.Models;
public class OrderStatusHistory
{
  [Key, Column(Order = 0)]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int OrderStatusHistoryId { get; set; }
  [Key]
  public OrderStatus OrderStatus { get; set; }
  [Key]
  [JsonIgnore]
  public Order Order { get; set; }
  public string Message { get; set; }
  public DateTime CreatedOn { get; set; }
  public bool ByUser { get; set; }
}