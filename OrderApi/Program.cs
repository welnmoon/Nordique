var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// ✅ Разрешаем запросы с любого источника (можно ограничить позже)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors(); // ✅ подключаем CORS

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
