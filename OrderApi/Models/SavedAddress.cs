using System;

namespace OrderApi.Models
{
    public class SavedAddress
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserEmail { get; set; } = string.Empty;
    public string RecipientName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Zip { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

}
