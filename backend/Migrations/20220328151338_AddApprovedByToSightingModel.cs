using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class AddApprovedByToSightingModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Users_UserId",
                table: "Sightings");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Sightings",
                newName: "CreatedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Sightings_UserId",
                table: "Sightings",
                newName: "IX_Sightings_CreatedByUserId");

            migrationBuilder.AddColumn<int>(
                name: "ApprovedByUserId",
                table: "Sightings",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_ApprovedByUserId",
                table: "Sightings",
                column: "ApprovedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Users_ApprovedByUserId",
                table: "Sightings",
                column: "ApprovedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Users_CreatedByUserId",
                table: "Sightings",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Users_ApprovedByUserId",
                table: "Sightings");

            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Users_CreatedByUserId",
                table: "Sightings");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_ApprovedByUserId",
                table: "Sightings");

            migrationBuilder.DropColumn(
                name: "ApprovedByUserId",
                table: "Sightings");

            migrationBuilder.RenameColumn(
                name: "CreatedByUserId",
                table: "Sightings",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Sightings_CreatedByUserId",
                table: "Sightings",
                newName: "IX_Sightings_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Users_UserId",
                table: "Sightings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
