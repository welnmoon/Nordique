namespace OrderApi.Models
{
    public class DeliveryAddress
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string UserEmail { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
