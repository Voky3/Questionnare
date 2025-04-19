-- Volitelné: vytvoření databáze, pokud ještě neexistuje
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'OnlineQuestionnaire')
BEGIN
    CREATE DATABASE OnlineQuestionnaire;
END
GO

USE OnlineQuestionnaire;
GO

-- Vytvoření tabulky Registrations
IF OBJECT_ID(N'dbo.Registrations', N'U') IS NOT NULL
    DROP TABLE dbo.Registrations;
GO

CREATE TABLE Registrations (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    BirthNumber NVARCHAR(20) NULL,
    BirthDate DATE NOT NULL,
    Gender NVARCHAR(20) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Nationality NVARCHAR(100) NOT NULL,
    ConsentToGdpr BIT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- Unikátní omezení
CREATE UNIQUE INDEX UX_Registrations_Email ON Registrations (Email);
GO

CREATE UNIQUE INDEX UX_Registrations_BirthNumber ON Registrations (BirthNumber)
WHERE BirthNumber IS NOT NULL;
GO