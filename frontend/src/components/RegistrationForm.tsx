import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import NationalitySelect from "./NationalitySelect";
import { parseCzechBirthNumber } from "../utils/parseCzechBirthNumber";

export default function RegistrationForm() {
    const { t, i18n } = useTranslation();

    const API_BASE = import.meta.env.VITE_API_URL;
    const gdprHref = i18n.language === "cz" ? "/gdpr_cz.html" : "/gdpr_en.html";

    const genderOptions = [
        { value: "male", label: t("genderOptions.male") },
        { value: "female", label: t("genderOptions.female") },
        { value: "other", label: t("genderOptions.other") }
    ];

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthNumber: "",
        hasNoBirthNumber: false,
        birthDate: "",
        gender: "",
        email: "",
        nationality: "",
        consentToGDPR: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = type === "checkbox" ? target.checked : undefined;

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };

            // Autofill birthDate from valid birthNumber only if gender is male/female and format is long enough
            if (
                name === "birthNumber" &&
                (prev.gender === "male" || prev.gender === "female") &&
                value.replace("/", "").length >= 9
            ) {
                const parsed = parseCzechBirthNumber(value, prev.gender);
                if (parsed) {
                    updated.birthDate = parsed;
                }
            }

            return updated;
        });
    };

    const handleLanguageSwitch = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmissionMessage(""); // Clear old messages

        try {
            const response = await fetch(`${API_BASE}/api/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log("API response:", result);

            if (!response.ok) {
                let errorMessage = "Unknown server error.";

                if (result?.error || result?.message) {
                    errorMessage = result.error || result.message;
                } else if (result?.errors) {
                    
                    errorMessage = Object.values(result.errors) // Combine all validation errors into one string
                        .flat()
                        .join(" ");
                }

                throw new Error(errorMessage);
            }

            setSubmissionMessage("Registration was successful.");

            // Reset form data on success
            setFormData({
                firstName: "",
                lastName: "",
                birthNumber: "",
                hasNoBirthNumber: false,
                birthDate: "",
                gender: "",
                email: "",
                nationality: "",
                consentToGDPR: false,
            });
        } catch (error: any) {
            console.error("Error during form submission:", error);
            setSubmissionMessage(`Error: ${error.message || "An error occurred."}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div>
            <div className="form-header">
                <h1>{t("title")}</h1>
                <LanguageSwitcher onSwitch={handleLanguageSwitch} />
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                    {t("firstName")}<span className="required">*</span>
                </label>
                <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label htmlFor="lastName">
                    {t("lastName")}<span className="required">*</span>
                </label>
                <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label htmlFor="gender">
                    {t("gender")}<span className="required">*</span>
                </label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled hidden>{t("gender")}</option>
                    {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="bNumber-row">
                    <label htmlFor="birthNumber">
                        {t("birthNumber")}<span className="required">*</span>
                    </label>

                    <input
                        id="birthNumber"
                        name="birthNumber"
                        value={formData.birthNumber}
                        onChange={handleChange}
                        disabled={formData.hasNoBirthNumber}
                        required={!formData.hasNoBirthNumber}
                    />

                    <input
                        type="checkbox"
                        id="hasNoBirthNumber"
                        name="hasNoBirthNumber"
                        checked={formData.hasNoBirthNumber}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData((prev) => ({
                                ...prev,
                                hasNoBirthNumber: checked,
                                birthNumber: checked ? "" : prev.birthNumber,
                            }));
                        }}
                    />
                    <label htmlFor="hasNoBirthNumber">{t("noBirthNumber")}</label>
                </div>

                <label htmlFor="birthDate">
                    {t("birthDate")}<span className="required">*</span>
                </label>
                <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">
                    {t("email")}<span className="required">*</span>
                </label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />


                <div>
                    <label htmlFor="nationality">
                        {t("nationality")} <span className="required">*</span>
                    </label>
                    <NationalitySelect
                        value={formData.nationality}
                        onChange={(val) => setFormData({ ...formData, nationality: val })}
                    />
                </div>

                <div className="gdpr-row">
                    <input
                        type="checkbox"
                        name="consentToGDPR"
                        id="consentToGDPR"
                        checked={formData.consentToGDPR}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="consentToGDPR">
                        <a href={gdprHref} target="_blank" rel="noopener noreferrer">GDPR</a>
                        <span className="required">*</span> – {t("consentToGDPR")}
                    </label>
                </div>


                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit"}
                </button>

                {submissionMessage && (
                    <div style={{ marginTop: "1rem", color: submissionMessage.includes("Error") ? "red" : "green" }}>
                        {submissionMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
