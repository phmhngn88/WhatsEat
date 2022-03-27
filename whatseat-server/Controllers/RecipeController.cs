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
        var recipe = await _recipeService.FindRecipeById(recipeId);
        return recipe is not null ? Ok(recipe) : NotFound(new { message = "recipe not found" });
    }

    [HttpGet]
    [Route("search")]
    public async Task<IActionResult> SearchRecipes([FromQuery] SearchParams searchParams)
    {
        var recipes = await _recipeService.SearchRecipeFullText(searchParams);

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

        return Ok(recipes);
    }

}