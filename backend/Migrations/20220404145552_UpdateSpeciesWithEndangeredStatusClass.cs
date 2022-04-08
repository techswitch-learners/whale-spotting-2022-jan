using Microsoft.EntityFrameworkCore.Migrations;

namespace WhaleSpotting.Migrations
{
    public partial class UpdateSpeciesWithEndangeredStatusClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Species_EndangeredStatusId",
                table: "Species",
                column: "EndangeredStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Species_EndangeredStatuses_EndangeredStatusId",
                table: "Species",
                column: "EndangeredStatusId",
                principalTable: "EndangeredStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Species_EndangeredStatuses_EndangeredStatusId",
                table: "Species");

            migrationBuilder.DropIndex(
                name: "IX_Species_EndangeredStatusId",
                table: "Species");
        }
    }
}
