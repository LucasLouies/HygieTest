using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HygieTestAPI.Migrations
{
    /// <inheritdoc />
    public partial class fk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bieres_brasseries_BrasseriesId",
                table: "bieres");

            migrationBuilder.DropForeignKey(
                name: "FK_stocks_bieres_BieresId",
                table: "stocks");

            migrationBuilder.DropForeignKey(
                name: "FK_stocks_grossistes_GrossistesId",
                table: "stocks");

            migrationBuilder.DropIndex(
                name: "IX_stocks_GrossistesId",
                table: "stocks");

            migrationBuilder.DropIndex(
                name: "IX_bieres_BrasseriesId",
                table: "bieres");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_stocks_GrossistesId",
                table: "stocks",
                column: "GrossistesId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_stocks_bieres_BieresId",
                table: "stocks",
                column: "BieresId",
                principalTable: "bieres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_stocks_grossistes_GrossistesId",
                table: "stocks",
                column: "GrossistesId",
                principalTable: "grossistes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
