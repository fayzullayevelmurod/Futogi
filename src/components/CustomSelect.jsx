import "./select.css";
import React, { useState, useEffect } from "react";

export const CustomSelect = ({ options, onChange, placeholder, value }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleOptionClick = (optionId) => {
    setSelectedValue(optionId);
    setIsOpen(false);
    onChange(optionId);
  };

  return (
    <div className="custom-select">
      <div
        className="custom-select__selected"
        tabIndex="0"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        {selectedValue
          ? options.find((option) => option.id === parseInt(selectedValue)).name
          : placeholder}
      </div>
      {isOpen && (
        <div className="custom-select__options">
          {options.map((option) => (
            <div
              key={option.id}
              className="custom-select__option"
              onMouseDown={() => handleOptionClick(option.id)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
