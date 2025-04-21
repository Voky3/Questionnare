using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineQuestionnaire.API.Data;
using OnlineQuestionnaire.API.Models;

namespace OnlineQuestionnaire.API.Controllers;


/// <summary>
/// API controller for handling registration form submissions
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RegistrationController(ApplicationDbContext context)
    {
        _context = context;
    }


    /// <summary>
    /// POST endpoint for submitting a new registration form
    /// Saves it to Db and returns JSON back to client
    /// </summary>
    /// <param name="model">The submitted registration form data</param>
    /// <returns>Success message and serialized JSON of the registration</returns>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Registration model)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { Error = "Invalid input data." });

        bool emailExists = await _context.Registrations.AnyAsync(r => r.Email.ToLower() == model.Email.ToLower());

        if (emailExists)
            return Conflict(new { Error = "This email address has already been used." });

        // Check for existing birth number only if one is provided
        if (!string.IsNullOrWhiteSpace(model.BirthNumber))
        {
            bool birthNumberExists = await _context.Registrations.AnyAsync(r => r.BirthNumber == model.BirthNumber);

            if (birthNumberExists)
                return Conflict(new { Error = "This birth number has already been used." });
        }

        _context.Registrations.Add(model);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            Message = "Registration was successfully saved.",
            Data = model
        });
    }
}
