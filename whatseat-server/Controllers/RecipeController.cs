using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
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
        var recipe = await _recipeService.FindRecipeById(recipeId);
        return recipe is not null ? Ok(recipe) : NotFound(new { message = "recipe not found" });
    }
    
}