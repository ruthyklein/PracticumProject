using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employees.Data.Migrations
{
    /// <inheritdoc />
    public partial class mig10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition");

            migrationBuilder.DropIndex(
                name: "IX_EmployeePosition_EmployeeId",
                table: "EmployeePosition");

            migrationBuilder.DropColumn(
                name: "EmployeeIdNumber",
                table: "EmployeePosition");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition",
                columns: new[] { "EmployeeId", "PositionId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition");

            migrationBuilder.AddColumn<string>(
                name: "EmployeeIdNumber",
                table: "EmployeePosition",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition",
                columns: new[] { "EmployeeIdNumber", "PositionId" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePosition_EmployeeId",
                table: "EmployeePosition",
                column: "EmployeeId");
        }
    }
}
