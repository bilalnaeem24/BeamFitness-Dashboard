import React from 'react';

interface SelectProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  name,
  options,
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
        )}{' '}
      </label>
      <select
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      >
        <option disabled>{placeholder}</option>
        {options &&
          options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
      </select>
    </div>
  );
};

export default Select;
