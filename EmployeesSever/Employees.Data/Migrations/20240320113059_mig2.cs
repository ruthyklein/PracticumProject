using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employees.Data.Migrations
{
    /// <inheritdoc />
    public partial class mig2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PositionList_EmployeeList_EmployeeId",
                table: "PositionList");

            migrationBuilder.DropIndex(
                name: "IX_PositionList_EmployeeId",
                table: "PositionList");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "PositionList");

            migrationBuilder.CreateTable(
                name: "EmployeePosition",
                columns: table => new
                {
                    EmployeeListId = table.Column<int>(type: "int", nullable: false),
                    PositionsListId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePosition", x => new { x.EmployeeListId, x.PositionsListId });
                    table.ForeignKey(
                        name: "FK_EmployeePosition_EmployeeList_EmployeeListId",
                        column: x => x.EmployeeListId,
                        principalTable: "EmployeeList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeePosition_PositionList_PositionsListId",
                        column: x => x.PositionsListId,
                        principalTable: "PositionList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePosition_PositionsListId",
                table: "EmployeePosition",
                column: "PositionsListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeePosition");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "PositionList",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PositionList_EmployeeId",
                table: "PositionList",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_PositionList_EmployeeList_EmployeeId",
                table: "PositionList",
                column: "EmployeeId",
                principalTable: "EmployeeList",
                principalColumn: "Id");
        }
    }
}
