export function parseCzechBirthNumber(birthNumber: string, gender: string): string | null {
    const cleaned = birthNumber.replace("/", "");

    if (!/^\d{9,10}$/.test(cleaned)) return null;

    let year = parseInt(cleaned.slice(0, 2), 10);
    let month = parseInt(cleaned.slice(2, 4), 10);
    let day = parseInt(cleaned.slice(4, 6), 10);

    if (month > 50) month -= 50;

    const currentYear = new Date().getFullYear() % 100;
    const currentCentury = Math.floor(new Date().getFullYear() / 100);
    const fullYear = year <= currentYear ? currentCentury * 100 + year : (currentCentury - 1) * 100 + year;

    const date = new Date(fullYear, month - 1, day);
    if (
        date.getFullYear() !== fullYear ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
    ) return null;

    if (gender === "female" && parseInt(cleaned.slice(2, 4)) <= 12) return null;
    if (gender === "male" && parseInt(cleaned.slice(2, 4)) > 50) return null;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`; // Return as yyyy-MM-dd
}