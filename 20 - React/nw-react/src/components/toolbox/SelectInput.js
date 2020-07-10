import React from "react";

const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => {
  return (
    <div class="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} value={value} onChange={onChange} className="form-control">
            <option value="">
                {defaultOption}
            </option>
            {
                options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.text}</option>
                ))
            }
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
