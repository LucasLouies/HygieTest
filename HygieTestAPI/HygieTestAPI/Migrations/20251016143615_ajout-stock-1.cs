using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HygieTestAPI.Migrations
{
    /// <inheritdoc />
    public partial class ajoutstock1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "stocks",
                columns: table => new
                {
                    BieresId = table.Column<Guid>(type: "uuid", nullable: false),
                    GrossistesId = table.Column<Guid>(type: "uuid", nullable: false),
                    Quantite = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stocks", x => new { x.BieresId, x.GrossistesId });
                    table.ForeignKey(
                        name: "FK_stocks_bieres_BieresId",
                        column: x => x.BieresId,
                        principalTable: "bieres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_stocks_grossistes_GrossistesId",
                        column: x => x.GrossistesId,
                        principalTable: "grossistes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_stocks_GrossistesId",
                table: "stocks",
                column: "GrossistesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "stocks");
        }
    }
}
