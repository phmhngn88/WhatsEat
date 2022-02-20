using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace whatseat_server.Migrations
{
    public partial class updatecustomerStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerStores_Customers_CustomerId",
                table: "CustomerStores");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerStores_Stores_StoreId",
                table: "CustomerStores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerStores",
                table: "CustomerStores");

            migrationBuilder.DropIndex(
                name: "IX_CustomerStores_CustomerId",
                table: "CustomerStores");

            migrationBuilder.DropColumn(
                name: "CustomerStoreId",
                table: "CustomerStores");

            migrationBuilder.DropColumn(
                name: "Like",
                table: "CustomerStores");

            migrationBuilder.AddColumn<int>(
                name: "ShippingInfoId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "CustomerStores",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CustomerId",
                table: "CustomerStores",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerStores",
                table: "CustomerStores",
                columns: new[] { "CustomerId", "StoreId" });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ShippingInfoId",
                table: "Orders",
                column: "ShippingInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerStores_Customers_CustomerId",
                table: "CustomerStores",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerStores_Stores_StoreId",
                table: "CustomerStores",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShippingInfos_ShippingInfoId",
                table: "Orders",
                column: "ShippingInfoId",
                principalTable: "ShippingInfos",
                principalColumn: "ShippingInfoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerStores_Customers_CustomerId",
                table: "CustomerStores");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerStores_Stores_StoreId",
                table: "CustomerStores");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShippingInfos_ShippingInfoId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ShippingInfoId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerStores",
                table: "CustomerStores");

            migrationBuilder.DropColumn(
                name: "ShippingInfoId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "CustomerStores",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<Guid>(
                name: "CustomerId",
                table: "CustomerStores",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<int>(
                name: "CustomerStoreId",
                table: "CustomerStores",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<bool>(
                name: "Like",
                table: "CustomerStores",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerStores",
                table: "CustomerStores",
                column: "CustomerStoreId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerStores_CustomerId",
                table: "CustomerStores",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerStores_Customers_CustomerId",
                table: "CustomerStores",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerStores_Stores_StoreId",
                table: "CustomerStores",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId");
        }
    }
}
