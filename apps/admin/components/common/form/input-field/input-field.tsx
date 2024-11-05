import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  type: React.HTMLInputTypeAttribute;
  name: string;
  label?: string;
  errors?: string[];
  wrapperClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = (props: Props) => {
  const { type = 'text', name, label, errors, wrapperClassName, ...rest } = props;

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label className="mb-2 inline-block" htmlFor={name}>
          {label}
        </Label>
      )}
      <Input type={type} id={name} name={name} {...rest} />
      {errors && <p className="mt-1 text-sm text-red-500">{errors.join('. ')}</p>}
    </div>
  );
};

export default InputField;
