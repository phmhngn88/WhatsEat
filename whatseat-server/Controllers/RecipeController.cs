using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;
using whatseat_server.Services;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace whatseat_server.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly RecipeService _recipeService;
    private readonly CustomerService _customerService;
    private readonly WhatsEatContext _context;

    public RecipeController(
        RecipeService recipeService,
        WhatsEatContext context,
        CustomerService customerService
        )
    {
        _context = context;
        _recipeService = recipeService;
        _customerService = customerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRecipes()
    {
        return Ok(await _recipeService.FindAllRecipes());
    }

    [HttpGet]
    [Route("{recipeId}", Name = "recipeId")]
    public async Task<IActionResult> GetRecipeDetails(int recipeId)
    {
        var item = await _recipeService.FindRecipeById(recipeId);
        return item is not null ? Ok(new RecipeDetailResponse
        {
            RecipeId = item.RecipeId,
            Name = item.Name,
            Description = item.Description,
            Serving = item.Serving,
            CreatedOn = item.CreatedOn,
            Creator = item.Creator,
            TotalTime = item.TotalTime,
            AvgRating = item.AvgRating,
            TotalRating = item.TotalRating,
            TotalView = item.TotalView,
            totalLike = item.totalLike,
            videoUrl = item.videoUrl,
            RecipeTypes = await _context.RecipeRecipeTypes.Where(rrt => rrt.RecipeId == item.RecipeId).ToListAsync(),
            Level = item.Level,
            Images = _recipeService.ConvertJsonToPhotos(item.ThumbnailUrl),
            Ingredients = _recipeService.ConvertJsonToIngredients(item.Ingredients),
            Steps = _recipeService.ConvertJsonToSteps(item.Steps)

        }) : NotFound(new { message = "recipe not found" });
    }

    [HttpGet]
    [Route("search")]
    public async Task<IActionResult> SearchRecipes([FromQuery] RecipeFilter recipeFilter)
    {
        var recipes = await _recipeService.SearchRecipeFullText(recipeFilter);

        var recipeRes = new List<RecipeResponse>();

        foreach (var item in recipes)
        {
            recipeRes.Add(new RecipeResponse
            {
                RecipeId = item.RecipeId,
                Name = item.Name,
                Description = item.Description,
                Serving = item.Serving,
                CreatedOn = item.CreatedOn,
                Creator = item.Creator,
                TotalTime = item.TotalTime,
                AvgRating = item.AvgRating,
                TotalRating = item.TotalRating,
                TotalView = item.TotalView,
                totalLike = item.totalLike,
                videoUrl = item.videoUrl,
                RecipeTypes = await _context.RecipeRecipeTypes.Where(rrt => rrt.RecipeId == item.RecipeId).ToListAsync(),
                Level = item.Level,
                Images = _recipeService.ConvertJsonToPhotos(item.ThumbnailUrl)
            });
        }

        var metadata = new
        {
            recipes.TotalCount,
            recipes.PageSize,
            recipes.CurrentPage,
            recipes.TotalPages,
            recipes.HasNext,
            recipes.HasPrevious
        };

        Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

        return Ok(recipeRes);
    }

    [HttpGet]
    [Route("top-eight")]
    public async Task<IActionResult> GetTopEight()
    {
        RecipeFilter recipeFilter = new RecipeFilter
        {
            PageSize = 8,
            sortAvgRating = "desc"
        };
        var recipes = await _recipeService.SearchRecipeFullText(recipeFilter);

        var recipeRes = new List<RecipeResponse>();

        foreach (var item in recipes)
        {
            recipeRes.Add(new RecipeResponse
            {
                RecipeId = item.RecipeId,
                Name = item.Name,
                Description = item.Description,
                Serving = item.Serving,
                CreatedOn = item.CreatedOn,
                Creator = item.Creator,
                TotalTime = item.TotalTime,
                AvgRating = item.AvgRating,
                TotalRating = item.TotalRating,
                TotalView = item.TotalView,
                totalLike = item.totalLike,
                videoUrl = item.videoUrl,
                RecipeTypes = await _context.RecipeRecipeTypes.Where(rrt => rrt.RecipeId == item.RecipeId).ToListAsync(),
                Level = item.Level,
                Images = _recipeService.ConvertJsonToPhotos(item.ThumbnailUrl)
            });
        }

        return Ok(recipeRes);

    }

    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviews([FromQuery] PagedRecipeRequest request)
    {
        var reviews = await _recipeService.GetAllRecipeReviews(request);

        var metadata = new
        {
            reviews.TotalCount,
            reviews.PageSize,
            reviews.CurrentPage,
            reviews.TotalPages,
            reviews.HasNext,
            reviews.HasPrevious
        };

        Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

        return Ok(reviews);
    }

    [HttpPost]
    [Route("reviews")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> PostReview([FromBody] RecipeReviewRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        var recipe = await _recipeService.FindRecipeById(request.RecipeId);
        RecipeReview recipeReview = new RecipeReview
        {
            Rating = request.Rating,
            Comment = request.Comment,
            CreatedOn = DateTime.UtcNow,
            Recipe = recipe,
            Customer = customer
        };

        var addRes = await _context.RecipeReviews.AddAsync(recipeReview);
        var changRes = await _context.SaveChangesAsync();

        return Ok(new { message = "Success" });
    }

}