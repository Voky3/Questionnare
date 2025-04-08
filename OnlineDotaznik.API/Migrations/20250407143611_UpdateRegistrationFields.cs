using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineDotaznik.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRegistrationFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PersonalId",
                table: "Registrations",
                newName: "BirthNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BirthNumber",
                table: "Registrations",
                newName: "PersonalId");
        }
    }
}
