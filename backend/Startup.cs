using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using WhaleSpotting.Repositories;
using WhaleSpotting.Services;
using System.Reflection;
using System.IO;

namespace WhaleSpotting
{
  public class Startup
  {
    private readonly string AllowAnyOriginPolicy = "_allowAnyOrigin";

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to
    // the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy(
          name: AllowAnyOriginPolicy,
          builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      });

      services.AddControllers();
      //     services.AddControllers().AddJsonOptions(x =>
      //  x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
          Title = "WhaleSpotting",
          Version = "v1"
        });

        // Set the comments path for the Swagger JSON and UI.
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
      });

      services.AddDbContext<WhaleSpottingDbContext>();
      services.AddTransient<IUsersRepo, UsersRepo>();
      services.AddTransient<ILocationsRepo, LocationsRepo>();
      services.AddTransient<ISpeciesRepo, SpeciesRepo>();
      services.AddTransient<ISightingsRepo, SightingsRepo>();
      services.AddTransient<IEndangeredRepo, EndangeredRepo>();
      services.AddTransient<IAuthService, AuthService>();
    }

    // This method gets called by the runtime. Use this method to configure the
    // HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json",
                                                "WhaleSpotting v1"));
      }

      app.UseCors(AllowAnyOriginPolicy);

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

      UpdateDatabase(app);
    }

    private void UpdateDatabase(IApplicationBuilder app)
    {
      using (var serviceScope = app.ApplicationServices
        .GetRequiredService<IServiceScopeFactory>()
        .CreateScope())
      {
        using (var context = serviceScope.ServiceProvider.GetService<WhaleSpottingDbContext>())
        {
          context.Database.Migrate();
        }
      }
    }
  }
}
