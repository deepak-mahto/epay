import React from "react";

const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-left py-2 text-slate-700">
        {label}
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
      />
    </div>
  );
};

export default InputBox;
