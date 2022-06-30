using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using whatseat_server.Data;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Models.DTOs.Responses;
using whatseat_server.Services;

namespace whatseat_server.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly MenuService _menuService;
    private readonly CustomerService _customerService;
    private readonly WhatsEatContext _context;

    public MenuController(MenuService menuService, CustomerService customerService, WhatsEatContext context)
    {
        _menuService = menuService;
        _customerService = customerService;
        _context = context;
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> PostMenu([FromBody] MenuRequest request)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        Menu menu = await _menuService.AddMenu(customer, request);
        return Ok(menu);
    }
    [HttpGet]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetMyMenus()
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        List<SimpleMenuDetailResponse> menu = await _menuService.GetMenusByCustomer(customer);
        return Ok(menu);
    }
    [HttpGet]
    [Route("{menuId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> GetMyMenu(int menuId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        Menu menu = await _menuService.GetMenuById(customer, menuId);
        if (menu is null)
        {
            return Forbid();
        }

        List<MenuDetail> menuDetails = await _menuService.GetMenuDetails(menuId);

        return Ok(menuDetails);
    }

    [HttpDelete]
    [Route("{menuId}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public async Task<IActionResult> DeleteMyMenu(int menuId)
    {
        Guid userId = new Guid(User.FindFirst("Id")?.Value);
        var customer = await _customerService.FindCustomerByIdAsync(userId);
        Menu menu = await _menuService.GetMenuById(customer, menuId);
        if (menu is null)
        {
            return Forbid();
        }

        _context.Remove(menu);

        await _context.SaveChangesAsync();

        return NoContent();
    }
    // [HttpGet]
    // [Route("/{menuId}")]
    // public async Task<IActionResult> GetMenuDetail(int menuId) {

    // }
}