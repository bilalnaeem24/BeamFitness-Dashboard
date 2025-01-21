import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="mb-4.5">
      <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
        {label}
        {required && (
          <span className={value ? 'text-green-500' : 'text-red-500'}> * </span>
        )}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default Input;
