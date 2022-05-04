using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using whatseat_server.Models;
using whatseat_server.Models.DTOs.Requests;
using whatseat_server.Services;

namespace whatseat_server.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly MenuService _menuService;
    private readonly CustomerService _customerService;

    public MenuController(MenuService menuService, CustomerService customerService)
    {
        _menuService = menuService;
        _customerService = customerService;
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

    // [HttpGet]
    // [Route("/{menuId}")]
    // public async Task<IActionResult> GetMenuDetail(int menuId) {

    // }
}