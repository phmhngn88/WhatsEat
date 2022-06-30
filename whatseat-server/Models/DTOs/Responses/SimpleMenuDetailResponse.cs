namespace whatseat_server.Models.DTOs.Responses
{
    public class SimpleMenuDetailResponse
    {
        public long MenuId { get; set; }
        public string MenuName { get; set; }
        public IList<SimpleMenuDetail> SimpleMenuDetail {get;set;}
    }

    public class SimpleMenuDetail
    {
        public long RecipeId { get; set; }
        public string RecipeName { get; set; }
        public float Calories { get; set; }
    }
}
