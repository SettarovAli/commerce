import { HTMLInputTypeAttribute } from 'react';

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  type?: HTMLInputTypeAttribute;
  error?: string;
};

const Input: React.FC<InputProps> = ({ name, label, value, onChange, type, error }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <input
        type={type || name}
        id={name}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
