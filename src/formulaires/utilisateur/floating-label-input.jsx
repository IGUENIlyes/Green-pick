/* eslint-disable no-unused-vars */


import { useState } from "react";
import { Input } from "./input";
import { motion } from "framer-motion";

export default function FloatingLabelInput({
  id,
  label,
  value,
  type = "text",
  onChange,
  error,
  className = "",
  rightElement,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`border rounded-md p-3 w-full ${
            rightElement ? "pr-10" : ""
          } ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <motion.label
          htmlFor={id}
          className="absolute left-3 pointer-events-none text-gray-500"
          initial={false}
          animate={{
            top: isActive ? "-0.5rem" : "50%",
            y: isActive ? 0 : "-50%",
            fontSize: isActive ? "0.75rem" : "1rem",
            backgroundColor: isActive ? "white" : "transparent",
            paddingLeft: isActive ? "0.25rem" : "0",
            paddingRight: isActive ? "0.25rem" : "0",
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>

        {rightElement && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
