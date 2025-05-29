
import { useState } from "react";
import "./FormInput.css";

const FormInput = ({ type, name, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setFocused(false);
    }
  };

  return (
    <div
      className={`commercant-form-input-container ${
        focused || value ? "focused" : ""
      }`}
    >
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="commercant-form-input"
        required
      />
      <label htmlFor={name} className="commercant-form-label">
        {placeholder}
      </label>
    </div>
  );
};

export default FormInput;
