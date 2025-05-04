using Microsoft.AspNetCore.Mvc;
using OrderApi.Models;

namespace OrderApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private static readonly List<FavoriteItem> Favorites = new();

        [HttpGet]
        public IActionResult GetFavorites([FromQuery] string email)
        {
            var userFavorites = Favorites.Where(f => f.UserEmail == email).ToList();
            return Ok(userFavorites);
        }

        [HttpPost]
        public IActionResult AddFavorite([FromBody] FavoriteItem item)
        {
            Favorites.Add(item);
            return Ok(new { message = "Добавлено в избранное", id = item.Id });
        }

        [HttpDelete]
        public IActionResult RemoveFavorite([FromQuery] string email, [FromQuery] string productId)
        {
            var item = Favorites.FirstOrDefault(f => f.UserEmail == email && f.ProductId == productId);
            if (item != null)
            {
                Favorites.Remove(item);
                return Ok(new { message = "Удалено из избранного" });
            }
            return NotFound(new { message = "Товар не найден в избранном" });
        }
    }
}
