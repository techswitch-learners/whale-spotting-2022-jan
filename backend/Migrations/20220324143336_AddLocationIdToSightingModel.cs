using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class AddLocationIdToSightingModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Locations_LocationId",
                table: "Sightings");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Sightings",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Locations_LocationId",
                table: "Sightings",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_Locations_LocationId",
                table: "Sightings");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Sightings",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_Locations_LocationId",
                table: "Sightings",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
