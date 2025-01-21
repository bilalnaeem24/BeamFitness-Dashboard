import React from 'react';

interface TextAreaProps {
  id: string;
  label: string;
  rows: number;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  rows,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      ></textarea>
    </div>
  );
};

export default TextArea;
