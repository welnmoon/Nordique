using System;

namespace OrderApi.Models
{
    public class Review
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string UserEmail { get; set; } = string.Empty;

        public string ProductId { get; set; } = string.Empty;

        public string Comment { get; set; } = string.Empty;

        public int Rating { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
