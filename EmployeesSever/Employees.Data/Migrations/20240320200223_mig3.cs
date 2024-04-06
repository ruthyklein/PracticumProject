using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employees.Data.Migrations
{
    /// <inheritdoc />
    public partial class mig3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_EmployeeList_EmployeeListId",
                table: "EmployeePosition");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_PositionList_PositionsListId",
                table: "EmployeePosition");

            migrationBuilder.DropColumn(
                name: "EntryDate",
                table: "PositionList");

            migrationBuilder.DropColumn(
                name: "IsAdministrative",
                table: "PositionList");

            migrationBuilder.RenameColumn(
                name: "PositionsListId",
                table: "EmployeePosition",
                newName: "PositionId");

            migrationBuilder.RenameColumn(
                name: "EmployeeListId",
                table: "EmployeePosition",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePosition_PositionsListId",
                table: "EmployeePosition",
                newName: "IX_EmployeePosition_PositionId");

            migrationBuilder.AddColumn<DateTime>(
                name: "EntryDate",
                table: "EmployeePosition",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsAdministrative",
                table: "EmployeePosition",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "EmployeeList",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_EmployeeList_EmployeeId",
                table: "EmployeePosition");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_PositionList_PositionId",
                table: "EmployeePosition");

            migrationBuilder.DropColumn(
                name: "EntryDate",
                table: "EmployeePosition");

            migrationBuilder.DropColumn(
                name: "IsAdministrative",
                table: "EmployeePosition");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "EmployeeList");

            migrationBuilder.RenameColumn(
                name: "PositionId",
                table: "EmployeePosition",
                newName: "PositionsListId");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "EmployeePosition",
                newName: "EmployeeListId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePosition_PositionId",
                table: "EmployeePosition",
                newName: "IX_EmployeePosition_PositionsListId");

            migrationBuilder.AddColumn<DateTime>(
                name: "EntryDate",
                table: "PositionList",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsAdministrative",
                table: "PositionList",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePosition_EmployeeList_EmployeeListId",
                table: "EmployeePosition",
                column: "EmployeeListId",
                principalTable: "EmployeeList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePosition_PositionList_PositionsListId",
                table: "EmployeePosition",
                column: "PositionsListId",
                principalTable: "PositionList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
