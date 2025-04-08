import React from "react";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

interface OptionType {
  value: string;
  label: string;
  countryCode: string;
}

interface NationalitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const NationalitySelect: React.FC<NationalitySelectProps> = ({ value, onChange }) => {
    const { t } = useTranslation();
  
    const options: OptionType[] = [
      { value: "cz", label: t("nationalities.cz"), countryCode: "CZ" },
      { value: "sk", label: t("nationalities.sk"), countryCode: "SK" },
      { value: "de", label: t("nationalities.de"), countryCode: "DE" },
      { value: "us", label: t("nationalities.us"), countryCode: "US" },
      { value: "fr", label: t("nationalities.fr"), countryCode: "FR" }
    ];
  
    const selectedOption = options.find((opt) => opt.value === value) || null;

  
    return (
      <Select
        value={selectedOption}
        onChange={(selected) => onChange((selected as OptionType).value)}
        options={options}
        placeholder={t("nationality")}
        formatOptionLabel={(e: OptionType) => (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ReactCountryFlag countryCode={e.countryCode} svg style={{ width: "1.2em", height: "1.2em" }} />
            {e.label}
          </div>
        )}
      />
    );
  };
  
  export default NationalitySelect;
