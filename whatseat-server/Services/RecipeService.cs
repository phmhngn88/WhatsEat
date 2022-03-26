using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;

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
        return await _context.Recipes.Include(p => p.RecipeSteps).AsNoTracking().ToListAsync();
    }

    public async Task<Recipe> FindRecipeById(int recipeId)
    {
        return await _context.Recipes.Include(p => p.RecipeSteps).FirstOrDefaultAsync(p => p.RecipeId == recipeId);
    }
}