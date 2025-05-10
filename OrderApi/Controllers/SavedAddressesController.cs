using Microsoft.AspNetCore.Mvc;
using OrderApi.Models;

namespace OrderApi.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class SavedAddressController : ControllerBase
{
    private static readonly List<SavedAddress> SavedAddresses = new();

    [HttpGet]
    public IActionResult GetAddress([FromQuery] string email)
    {
        var address = SavedAddresses.FirstOrDefault(a => a.UserEmail == email);
        if (address == null)
            return NotFound(new { message = "Сохранённый адрес не найден" });

        return Ok(address);
    }

    [HttpPost]
    public IActionResult SaveOrUpdateAddress([FromBody] SavedAddress newAddress)
    {
        var existing = SavedAddresses.FirstOrDefault(a => a.UserEmail == newAddress.UserEmail);
        if (existing != null)
        {
            SavedAddresses.Remove(existing);
        }

        newAddress.UpdatedAt = DateTime.UtcNow;
        SavedAddresses.Add(newAddress);

        return Ok(new { message = "Адрес сохранён" });
    }
}

}
