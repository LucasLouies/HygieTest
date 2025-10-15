using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HygieTestAPI.Migrations
{
    /// <inheritdoc />
    public partial class test_fk4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_bieres_BrasseriesId",
                table: "bieres",
                column: "BrasseriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_bieres_brasseries_BrasseriesId",
                table: "bieres",
                column: "BrasseriesId",
                principalTable: "brasseries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bieres_brasseries_BrasseriesId",
                table: "bieres");

            migrationBuilder.DropIndex(
                name: "IX_bieres_BrasseriesId",
                table: "bieres");
        }
    }
}
