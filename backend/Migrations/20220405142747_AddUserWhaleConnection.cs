using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class AddUserWhaleConnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Whales",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserWhale",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    WhaleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWhale", x => new { x.UserId, x.WhaleId });
                    table.ForeignKey(
                        name: "FK_UserWhale_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserWhale_Whales_WhaleId",
                        column: x => x.WhaleId,
                        principalTable: "Whales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserWhale_WhaleId",
                table: "UserWhale",
                column: "WhaleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserWhale");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Whales");
        }
    }
}
