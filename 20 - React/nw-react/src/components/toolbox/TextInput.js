import React from "react";

const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  return (
    <div className={(error && error.length > 0) ? "form-group has-error" : "form-group"}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
