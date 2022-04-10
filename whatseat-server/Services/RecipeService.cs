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

    public async Task<PagedList<Recipe>> SearchRecipeFullText(SearchParams searchParams)
    {
        var recipes = _context.Recipes.FromSqlInterpolated($"select * from recipes where MATCH(name) against ({searchParams.searchTerm})");

        var res = await PagedList<Recipe>.ToPagedList(recipes, searchParams.PageNumber, searchParams.PageSize);

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