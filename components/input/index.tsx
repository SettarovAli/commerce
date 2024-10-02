import { HTMLInputTypeAttribute } from 'react';

type InputProps = {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  errors?: string[];
};

const Input: React.FC<InputProps> = ({ name, label, value, onChange, type, errors }) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        required
        autoComplete={name}
        className="mt-2 block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        value={value}
        {...(onChange ? { onChange: (e) => onChange(e.target.value) } : {})}
      />
      {errors && <p className="mt-1 text-sm text-red-500">{errors.join('. ')}</p>}
    </div>
  );
};

export default Input;
