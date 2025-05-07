using System;
using System.Collections.Generic;

namespace OrderApi.Models
{
    public class OrderItem
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public List<string> Images { get; set; } = new();
    }

    public class Order
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string UserEmail { get; set; } = string.Empty;
        public List<OrderItem> Items { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string RecipientName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
    }
}
