import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
        width: "100%",
        margin: "4px 0"
      }}
    />
  );
};
