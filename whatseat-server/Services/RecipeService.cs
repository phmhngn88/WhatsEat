using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;

namespace whatseat_server.Services;

public class RecipeService
{
    private readonly WhatsEatContext _context;
    public RecipeService(WhatsEatContext context)
    {
        _context = context;
    }
    public async Task<List<Recipe>> FindAllRecipes()
    {
        // TODO: sort, paginate
        return await _context.Recipes.AsNoTracking().ToListAsync();
    }

    public async Task<Recipe> FindRecipeById(int recipeId)
    {
        return await _context.Recipes.FirstOrDefaultAsync(p => p.RecipeId == recipeId);
    }

    public async Task<PagedList<Recipe>> SearchRecipeFullText(RecipeFilter recipeFilter)
    {
        IQueryable<Recipe> recipes = _context.Recipes.AsQueryable();
        if (!String.IsNullOrEmpty(recipeFilter.searchTerm))
        {
            recipes = _context.Recipes.FromSqlInterpolated($"select * from recipes where MATCH(name) against ({recipeFilter.searchTerm})");
        }

        if (!String.IsNullOrEmpty(recipeFilter.level))
        {
            recipes = recipes.Where(r => r.Level == recipeFilter.level);
        }

        switch (recipeFilter.sortDate)
        {
            case "asc":
                recipes = recipes.OrderBy(r => r.CreatedOn);
                break;
            case "desc":
                recipes = recipes.OrderByDescending(r => r.CreatedOn);
                break;
            default:
                break;
        }

        switch (recipeFilter.sortAvgRating)
        {
            case "asc":
                recipes = recipes.OrderBy(r => r.AvgRating);
                break;
            case "desc":
                recipes = recipes.OrderByDescending(r => r.AvgRating);
                break;
            default:
                break;
        }

        switch (recipeFilter.sortTotalView)
        {
            case "asc":
                recipes = recipes.OrderBy(r => r.TotalView);
                break;
            case "desc":
                recipes = recipes.OrderByDescending(r => r.TotalView);
                break;
            default:
                break;
        }

        if (recipeFilter.MinTotalTime > 0)
        {
            recipes = recipes.Where(r => r.TotalTime >= recipeFilter.MinTotalTime);
        }

        if (recipeFilter.MaxTotalTime > 0)
        {
            recipes = recipes.Where(r => r.TotalTime <= recipeFilter.MaxTotalTime);
        }

        if (recipeFilter.recipeTypes.Length > 0)
        {
            recipes = recipes
                .Where(r => r.RecipeRecipeTypes
                    .Any(rrt => recipeFilter.recipeTypes.Contains(rrt.RecipeTypeId)));
        }

        var res = await PagedList<Recipe>.ToPagedList(recipes, recipeFilter.PageNumber, recipeFilter.PageSize);

        return res;
    }


    public async Task<PagedList<RecipeReview>> GetAllRecipeReviews(PagedRequest pagedRequest)
    {
        var recipeReviews = _context.RecipeReviews.AsNoTracking().OrderByDescending(rr => rr.CreatedOn);

        var res = await PagedList<RecipeReview>.ToPagedList(recipeReviews, pagedRequest.PageNumber, pagedRequest.PageSize);
        return res;
    }

    public List<Photo> ConvertJsonToPhotos(string jsonPhotos)
    {
        jsonPhotos = jsonPhotos.Substring(1, jsonPhotos.Length - 2);
        List<Photo> result = JsonConvert.DeserializeObject<List<Photo>>(jsonPhotos);
        return result;
    }

}