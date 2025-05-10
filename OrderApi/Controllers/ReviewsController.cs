using Microsoft.AspNetCore.Mvc;
using OrderApi.Models;

namespace OrderApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private static readonly List<Review> Reviews = new();

        [HttpGet]
        public IActionResult GetReviews([FromQuery] string productId)
        {
            var result = Reviews.Where(r => r.ProductId == productId).ToList();
            return Ok(result);
        }

        [HttpPost]
public IActionResult AddReview([FromBody] Review review)
{
    var existingReview = Reviews.FirstOrDefault(r =>
        r.ProductId == review.ProductId &&
        r.UserEmail == review.UserEmail
    );

    if (existingReview != null)
    {
        return BadRequest(new { message = "Вы уже оставляли отзыв на этот товар." });
    }

    Reviews.Add(review);
    return Ok(new { message = "Отзыв добавлен", id = review.Id });
}


        [HttpDelete]
        public IActionResult DeleteReview([FromQuery] Guid id)
        {
            var review = Reviews.FirstOrDefault(r => r.Id == id);
            if (review == null)
                return NotFound(new { message = "Отзыв не найден" });

            Reviews.Remove(review);
            return Ok(new { message = "Отзыв удалён" });
        }
    }
}
