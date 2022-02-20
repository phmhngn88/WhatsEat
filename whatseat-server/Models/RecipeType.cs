using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace whatseat_server.Models;

public class RecipeType
{
    [Key, Column(Order = 0)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RecipeTypeId { get; set; }
    public string Name { get; set; }
}