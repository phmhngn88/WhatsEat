using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace whatseat_server.Migrations
{
    public partial class fulltext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        }
    }
}
