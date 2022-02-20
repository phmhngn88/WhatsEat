using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace whatseat_server.Migrations
{
    public partial class addautoincrement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "Stores",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 0)
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Stores",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Stores",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stores_UserId",
                table: "Stores",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_AspNetUsers_UserId",
                table: "Stores",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stores_AspNetUsers_UserId",
                table: "Stores");

            migrationBuilder.DropIndex(
                name: "IX_Stores_UserId",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Stores");

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "Stores",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("Relational:ColumnOrder", 0)
                .OldAnnotation("SqlServer:Identity", "1, 1");
        }
    }
}
