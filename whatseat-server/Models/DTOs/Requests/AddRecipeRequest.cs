namespace whatseat_server.Models.DTOs.Requests
{
    public class AddRecipeRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Serving { get; set; }
        public int TotalTime { get; set; }
        public string ThumbnailUrl { get; set; }
        public int RecipeTypeId { get; set; }
    }
}