using System;

namespace OrderApi.Models
{
    public class FavoriteItem
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // Уникальный ID записи
        public string ProductId { get; set; } = string.Empty; // ID товара
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string UserEmail { get; set; } = string.Empty; // Кому принадлежит
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
