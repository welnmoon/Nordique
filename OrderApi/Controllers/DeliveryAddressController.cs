using Microsoft.AspNetCore.Mvc;
using OrderApi.Models;

namespace OrderApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryAddressController : ControllerBase
    {
        private static readonly List<DeliveryAddress> Addresses = new();

        [HttpPost]
        public IActionResult SaveAddress([FromBody] DeliveryAddress address)
        {
            var existing = Addresses.FirstOrDefault(a => a.UserEmail == address.UserEmail);
            if (existing != null) Addresses.Remove(existing);

            Addresses.Add(address);
            return Ok(new { message = "Адрес сохранён" });
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
