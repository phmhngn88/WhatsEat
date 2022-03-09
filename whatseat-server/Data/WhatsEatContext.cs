using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using whatseat_server.Models;

namespace whatseat_server.Data;

public class WhatsEatContext : IdentityDbContext
{
    public WhatsEatContext(DbContextOptions<WhatsEatContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderDetail>().HasKey(od => new { od.OrderId, od.ProductId });
        modelBuilder.Entity<CartDetail>().HasKey(cd => new { cd.ProductId, cd.CustomerId });
        modelBuilder.Entity<CustomerStore>().HasKey(cs => new { cs.CustomerId, cs.StoreId });
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<CartDetail> CartDetails => Set<CartDetail>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<CustomerStore> CustomerStores => Set<CustomerStore>();
    public DbSet<Ingredient> Ingredients => Set<Ingredient>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();
    public DbSet<OrderStatus> OrderStatuses => Set<OrderStatus>();
    public DbSet<OrderStatusHistory> OrderStatusHistories => Set<OrderStatusHistory>();
    public DbSet<PaymentMethod> PaymentMethods => Set<PaymentMethod>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductReview> ProductReviews => Set<ProductReview>();
    public DbSet<ProductViewHistory> ProductViewHistories => Set<ProductViewHistory>();
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<RecipeRating> RecipeRatings => Set<RecipeRating>();
    public DbSet<RecipeStepImage> RecipeStepImages => Set<RecipeStepImage>();
    public DbSet<RecipeType> RecipeTypes => Set<RecipeType>();
    public DbSet<RecipeViewHistory> RecipeViewHistories => Set<RecipeViewHistory>();
    public DbSet<Shipper> Shippers => Set<Shipper>();
    public DbSet<ShippingInfo> ShippingInfos => Set<ShippingInfo>();
    public DbSet<Store> Stores => Set<Store>();
    public DbSet<Unit> Units => Set<Unit>();
    public DbSet<RecipeStep> RecipeSteps => Set<RecipeStep>();
}