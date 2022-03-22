using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class EditFieldTypesOnSightingModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Users_UserId1",
                table: "Sightings");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_UserId1",
                table: "Sightings");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Sightings");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Sightings",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_UserId",
                table: "Sightings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Users_UserId",
                table: "Sightings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Users_UserId",
                table: "Sightings");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_UserId",
                table: "Sightings");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Sightings",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Sightings",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_UserId1",
                table: "Sightings",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Users_UserId1",
                table: "Sightings",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
