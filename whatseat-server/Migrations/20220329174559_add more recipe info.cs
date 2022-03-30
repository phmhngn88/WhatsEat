using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace whatseat_server.Migrations
{
    public partial class addmorerecipeinfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "AvgRating",
                table: "Recipes",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "TotalRating",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalView",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "totalLike",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "videoUrl",
                table: "Recipes",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.Sql(
                sql: "alter table Recipes add fulltext (Name);",
                suppressTransaction: true
            );

            migrationBuilder.Sql(
                sql: "alter table Products add fulltext (Name);",
                suppressTransaction: true
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvgRating",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "TotalRating",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "TotalView",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "totalLike",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "videoUrl",
                table: "Recipes");
        }
    }
}
