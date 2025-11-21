import React from 'react';

const FloatingLabelInput = ({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  type = "text", 
  disabled = false, 
  required = false,
  placeholder = "",
  maxLength
}) => {
  return (
    <div className="relative flex-1">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        className={`peer w-full border border-gray-300 rounded-md px-2 pt-5 pb-2 
        placeholder-transparent h-12 text-sm focus:outline-none focus:border-black
        ${disabled ? 'bg-gray-50' : ''}`}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform
        -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black"
      >
        {label}{required ? '*' : ''}
      </label>
    </div>
  );
};

export default FloatingLabelInput;