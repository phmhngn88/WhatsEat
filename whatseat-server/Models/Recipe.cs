using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace whatseat_server.Models;

public class Recipe
{
    [Key, Column(Order = 0)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RecipeId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Serving { get; set; }
    public DateTime CreatedOn { get; set; }
    public Customer Creator { get; set; }
    public int TotalTime { get; set; }
    public float AvgRating { get; set; }
    public int TotalRating { get; set; }
    public int TotalView { get; set; }
    public int totalLike { get; set; }
    public string videoUrl { get; set; }
    public RecipeType RecipeType { get; set; }
    public ICollection<RecipeStep> RecipeSteps { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
    public string ThumbnailUrl { get; set; }
}