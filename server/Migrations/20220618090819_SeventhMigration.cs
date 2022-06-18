using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class SeventhMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SavingAccountId",
                table: "TransactionHistory",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_SavingAccountId",
                table: "TransactionHistory",
                column: "SavingAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionHistory_SavingAccount_SavingAccountId",
                table: "TransactionHistory",
                column: "SavingAccountId",
                principalTable: "SavingAccount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionHistory_SavingAccount_SavingAccountId",
                table: "TransactionHistory");

            migrationBuilder.DropIndex(
                name: "IX_TransactionHistory_SavingAccountId",
                table: "TransactionHistory");

            migrationBuilder.DropColumn(
                name: "SavingAccountId",
                table: "TransactionHistory");
        }
    }
}
