import { useState, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");
  // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "F") {
  //     handleToggleSwitchChange("C");
  //   }
  //   if (currentTemperatureUnit === "C") {
  //     handleToggleSwitchChange("F");
  //   }
  // };
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="header__switch">
      <input className="header__toggle" type="checkbox" onChange={handleToggleSwitchChange}></input>
      <span className="header__slider"></span>
      <div className="header__toggle_text_section">
        <p className={`header__toggle_text_f`}>F</p>
        <p className={`header__toggle_text_c`}>C</p>
      </div>
    </label>
  );
};

export default ToggleSwitch;
