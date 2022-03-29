using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace whatseat_server.Models;

public class Customer
{
    public Guid CustomerId { get; set; }
    public string Name { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string IDCard { get; set; }
    public string AvatarUrl { get; set; }
    [JsonIgnore]
    public ShippingInfo DefaultShippingInfo { get; set; }
    [JsonIgnore]
    public ICollection<CartDetail> CartDetails { get; set; }
    public ICollection<ShippingInfo> ShippingInfos { get; set; }
    [JsonIgnore]
    public ICollection<Recipe> Recipes { get; set; }
    [JsonIgnore]
    public ICollection<Order> Orders { get; set; }
}