using Microsoft.EntityFrameworkCore;
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
}