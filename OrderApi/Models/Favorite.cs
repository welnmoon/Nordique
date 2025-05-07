using System.Text.Json.Serialization;

public class FavoriteItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string ProductId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string UserEmail { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
