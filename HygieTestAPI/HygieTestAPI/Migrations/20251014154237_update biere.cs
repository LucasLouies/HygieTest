using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HygieTestAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatebiere : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Degre",
                table: "bieres",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Prix",
                table: "bieres",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Degre",
                table: "bieres");

            migrationBuilder.DropColumn(
                name: "Prix",
                table: "bieres");
        }
    }
}
