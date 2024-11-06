'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type Props = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = (props: Props) => {
  const { label, name, ...rest } = props;

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base" htmlFor={name}>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              id={name}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              {...rest}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { InputField };
