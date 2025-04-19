using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace OnlineQuestionnaire.API.Models;

/// <summary>
/// Represents submitted registration entry
/// </summary>
public class Registration
{
    /// <summary>
    /// Primary key 
    /// </summary>
    public int Id { get; set; }

    [Required]
    public string FirstName { get; set; } = null!;

    [Required]
    public string LastName { get; set; } = null!;

    /// <summary>
    /// Birth registration number/rodné číslo, may be optional if user checks "I don't have one"
    /// </summary>
    public string? BirthNumber { get; set; }

    [Required]
    public DateTime BirthDate { get; set; }

    [Required]
    public string Gender { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string Nationality { get; set; } = null!;

    [Required]
    public bool ConsentToGdpr { get; set; }

    /// <summary>
    /// Timestamp of when the registration was created (UTC)
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
