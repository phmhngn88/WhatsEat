using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;

namespace whatseat_server.Services;

public class MenuService
{
    private readonly WhatsEatContext _context;
    public MenuService(WhatsEatContext context)
    {
        _context = context;
    }
    public async Task<Menu> AddMenu(Customer customer, MenuRequest request)
    {
        Menu menu = new Menu
        {
            ModifiedOn = DateTime.UtcNow,
            MenuName = request.MenuName,
            MenuDetails = new List<MenuDetail>(),
            Customer = customer
        };

        foreach (var recipeId in request.RecipeIds)
        {
            Recipe recipe = await _context.Recipes.FirstOrDefaultAsync(r => r.RecipeId == recipeId);
            if (recipe is not null)
            {
                menu.MenuDetails.Add(new MenuDetail
                {
                    Recipe = recipe
                });
            }
        }
        var menuRes = await _context.Menus.AddAsync(menu);
        await _context.SaveChangesAsync();
        return menuRes.Entity;
    }

    public async Task<Menu> findMenuById(int menuId)
    {
        return await _context.Menus.AsNoTracking().Include(m => m.MenuDetails)
            .Include(m => m.Customer).FirstOrDefaultAsync(m => m.MenuId == menuId);
    }
}