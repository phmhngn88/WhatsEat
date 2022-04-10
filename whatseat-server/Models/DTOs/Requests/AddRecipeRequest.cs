namespace whatseat_server.Models.DTOs.Requests
{
    public class AddRecipeRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Serving { get; set; }
        public int TotalTime { get; set; }
        public string ThumbnailUrl { get; set; }
        public float AvgRating { get; set; }
        public int TotalRating { get; set; }
        public int TotalView { get; set; }
        public int totalLike { get; set; }
        public string videoUrl { get; set; }
        public List<int> RecipeTypeIds { get; set; }
        public ICollection<RecipeStep> RecipeSteps { get; set; }
    }
}