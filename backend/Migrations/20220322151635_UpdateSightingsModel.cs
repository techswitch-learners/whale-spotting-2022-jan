using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class UpdateSightingsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LocationName",
                table: "Sightings",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "Sightings",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Sightings",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_LocationId",
                table: "Sightings",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_UserId1",
                table: "Sightings",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Locations_LocationId",
                table: "Sightings",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Users_UserId1",
                table: "Sightings",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Locations_LocationId",
                table: "Sightings");

            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Users_UserId1",
                table: "Sightings");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_LocationId",
                table: "Sightings");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_UserId1",
                table: "Sightings");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Sightings");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Sightings");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Sightings",
                newName: "LocationName");
        }
    }
}
