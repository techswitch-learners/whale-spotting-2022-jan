using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WhaleSpotting.Migrations
{
    public partial class CreateEndangeredStatusTableAndUpdateSpeciesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndangeredStatus",
                table: "Species");

            migrationBuilder.AddColumn<int>(
                name: "EndangeredStatusId",
                table: "Species",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "EndangeredStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndangeredStatuses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EndangeredStatuses");

            migrationBuilder.DropColumn(
                name: "EndangeredStatusId",
                table: "Species");

            migrationBuilder.AddColumn<string>(
                name: "EndangeredStatus",
                table: "Species",
                type: "text",
                nullable: true);
        }
    }
}
