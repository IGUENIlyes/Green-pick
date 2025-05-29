import { useState } from "react";
import "./FormInputAssociation.css";

const FormInputAssociation = ({ label, type, name, value, onChange }) => {
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
      className={`association-form-input-container ${
        focused || value ? "focused" : ""
      }`}
    >
      <input
        type={type}
        id={name}
        name={name}
        className="association-form-input"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
      />
      <label className="association-form-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default FormInputAssociation;
