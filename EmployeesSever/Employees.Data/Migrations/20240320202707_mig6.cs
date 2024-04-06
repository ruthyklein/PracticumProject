using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employees.Data.Migrations
{
    /// <inheritdoc />
    public partial class mig6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdministrative",
                table: "EmployeePosition");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdministrative",
                table: "PositionList",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdministrative",
                table: "PositionList");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdministrative",
                table: "EmployeePosition",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
