import React, { useState } from "react";

interface ToggleSwitchProps {
  name: string;
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
