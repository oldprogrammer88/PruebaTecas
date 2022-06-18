using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server;
using server.Data;
using server.Mapper;
using server.Models.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Services.ConfigureServices(builder);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddCors(setup => setup.AddPolicy("default", p => p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run("http://localhost:48593");
