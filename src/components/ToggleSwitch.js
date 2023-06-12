import { useState, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    handleToggleSwitchChange();
  };

  return (
    <label className="header__switch">
      <input
        className="header__toggle"
        type="checkbox"
        onChange={handleChange}
        checked={checked}></input>
      <span className="header__slider"></span>
      <div className="header__toggle_text_section">
        <span
          className={`header__toggle_text_f ${
            currentTemperatureUnit === "F" ? "header__toggle_text_active" : ""
          }`}>
          F
        </span>
        <span
          className={`header__toggle_text_c ${
            currentTemperatureUnit === "C" ? "header__toggle_text_active" : ""
          }`}>
          C
        </span>
        {/* <span
          className={`header__toggle_text ${
            currentTemperatureUnit === "F" ? "header__toggle_text_active" : ""
          }`}>
          F
        </span>
        <span
          className={`header__toggle_text ${
            currentTemperatureUnit === "C" ? "header__toggle_text_active" : ""
          }`}>
          C
        </span> */}
        {/* <p className={`header__toggle_text_f ${checked && "header__toggle_text_active"}`}>F</p>
        <p className={`header__toggle_text_c ${!checked && "header__toggle_text_active"}`}>C</p> */}
      </div>
    </label>
  );
};

export default ToggleSwitch;
