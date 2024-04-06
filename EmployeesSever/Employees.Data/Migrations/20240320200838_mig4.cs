using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employees.Data.Migrations
{
    /// <inheritdoc />
    public partial class mig4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_EmployeeList_EmployeeId",
                table: "EmployeePosition");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_PositionList_PositionId",
                table: "EmployeePosition");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition");

            migrationBuilder.RenameTable(
                name: "EmployeePosition",
                newName: "EmployeePositionList");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePosition_PositionId",
                table: "EmployeePositionList",
                newName: "IX_EmployeePositionList_PositionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeePositionList",
                table: "EmployeePositionList",
                columns: new[] { "EmployeeId", "PositionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePositionList_EmployeeList_EmployeeId",
                table: "EmployeePositionList",
                column: "EmployeeId",
                principalTable: "EmployeeList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePositionList_PositionList_PositionId",
                table: "EmployeePositionList",
                column: "PositionId",
                principalTable: "PositionList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePositionList_EmployeeList_EmployeeId",
                table: "EmployeePositionList");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePositionList_PositionList_PositionId",
                table: "EmployeePositionList");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeePositionList",
                table: "EmployeePositionList");

            migrationBuilder.RenameTable(
                name: "EmployeePositionList",
                newName: "EmployeePosition");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePositionList_PositionId",
                table: "EmployeePosition",
                newName: "IX_EmployeePosition_PositionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition",
                columns: new[] { "EmployeeId", "PositionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePosition_EmployeeList_EmployeeId",
                table: "EmployeePosition",
                column: "EmployeeId",
                principalTable: "EmployeeList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePosition_PositionList_PositionId",
                table: "EmployeePosition",
                column: "PositionId",
                principalTable: "PositionList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
