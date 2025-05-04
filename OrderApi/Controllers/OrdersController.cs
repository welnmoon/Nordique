using Microsoft.AspNetCore.Mvc;
using OrderApi.Models;

namespace OrderApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        // Временное in-memory хранилище заказов
        private static readonly List<Order> Orders = new();

        // POST: api/orders
        [HttpPost]
        public IActionResult CreateOrder([FromBody] Order order)
        {
            Orders.Add(order);
            return Ok(new { message = "Заказ сохранён", orderId = order.Id });
        }

        // GET: api/orders?email=someone@example.com
        [HttpGet]
        public IActionResult GetOrders([FromQuery] string email)
        {
            var userOrders = Orders.Where(o => o.UserEmail == email).ToList();
            return Ok(userOrders);
        }
    }
}
