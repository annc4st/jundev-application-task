using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// logs
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Information);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<TaskDb>(options => options.UseInMemoryDatabase("TaskList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "Tasks API";
    config.Title = "Tasks API v1";
    config.Version = "v1";


});

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});


// cors policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", p => p
    .WithOrigins("http://localhost:5173")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "Tasks API";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });

    app.UseCors("AllowReact"); // enable CORS in dev
    app.UseOpenApi();
    app.UseSwaggerUi(config => { /*...*/ });
}

app.UseHttpsRedirection();


app.MapGet("/tasks", async (TaskDb db) =>
    await db.Tasks.ToListAsync()
);

app.MapGet("/tasks/{id}", async (TaskDb db, int id) =>
    await db.Tasks.FindAsync(id)
    is Task task
        ? Results.Ok(task)
        : Results.NotFound()
);

app.MapPost("/tasks", async (TaskDb db, Task task) =>
{
    db.Tasks.Add(task);
    await db.SaveChangesAsync();

    return Results.Created($"/tasks/{task.Id}", task);
});

app.MapPut("/tasks/{id}", async (TaskDb db, int id, Task inputTask) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task is null) return Results.NotFound();

    task.Title = inputTask.Title;
    task.Description = inputTask.Description;
    task.Status = inputTask.Status;
    task.DueDate = inputTask.DueDate;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/tasks/{id}", async (TaskDb db, int id) =>
{
    if (await db.Tasks.FindAsync(id) is Task task)
    {
        db.Tasks.Remove(task);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});


app.Run();


