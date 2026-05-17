import React from "react";
import "./formInput.css";

const FormInput = (props) => {
  const { label, onChange, errorMessages,  id, ...inputProps } = props;
  return (
    <div className="formInput">
      <label htmlFor="">{label}:</label>
      <input {...inputProps} onChange={onChange} />
      <span>{errorMessages}</span>
    </div>
  );
};

export default FormInput;
