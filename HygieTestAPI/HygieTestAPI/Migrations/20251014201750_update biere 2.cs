using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HygieTestAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatebiere2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "bieres",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "bieres");
        }
    }
}
