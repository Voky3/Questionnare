import React from "react";
import ReactCountryFlag from "react-country-flag";

interface LanguageSwitcherProps {
  onSwitch: (lang: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onSwitch }) => {
  return (
    <div className="language-switch">
      <button onClick={() => onSwitch("cz")}>
        <ReactCountryFlag countryCode="CZ" svg style={{ width: "1.5em", height: "1.5em" }} title="CZ" /> CZ
      </button>
      <button onClick={() => onSwitch("en")}>
        <ReactCountryFlag countryCode="GB" svg style={{ width: "1.5em", height: "1.5em" }} title="EN" /> EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
