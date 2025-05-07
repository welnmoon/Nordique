using Microsoft.AspNetCore.Mvc;
using OrderApi.Models;

namespace OrderApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SavedAddressController : ControllerBase
    {
        private static readonly List<SavedAddress> Addresses = new();

        [HttpPost]
        public IActionResult SaveAddress([FromBody] SavedAddress address)
        {
            var existing = Addresses.FirstOrDefault(a => a.UserEmail == address.UserEmail);
            if (existing != null) Addresses.Remove(existing);

            Addresses.Add(address);
            return Ok(new { message = "Сохранённый адрес обновлён" });
        }

        [HttpGet]
        public IActionResult GetAddress([FromQuery] string email)
        {
            var address = Addresses.FirstOrDefault(a => a.UserEmail == email);
            if (address == null) return NotFound(new { message = "Адрес не найден" });

            return Ok(address);
        }
    }
}
