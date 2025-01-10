'use client';

import * as React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { useController, UseControllerProps } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const radioVariants = cva(
  'flex items-center justify-center rounded-full border text-primary ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary',
        outline: 'border-2 border-input'
      },
      size: {
        default: 'h-4 w-4',
        sm: 'h-3 w-3',
        lg: 'h-5 w-5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioSelectProps extends VariantProps<typeof radioVariants>, UseControllerProps {
  options: RadioOption[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  labelClassName?: string;
}

export const RadioSelect = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  RadioSelectProps
>(
  (
    {
      options,
      variant,
      size,
      name,
      control,
      defaultValue,
      rules,
      orientation = 'vertical',
      labelClassName,
      className,
      ...props
    },
    ref
  ) => {
    const { field } = useController({
      name,
      control,
      defaultValue,
      rules
    });

    return (
      <RadioGroup.Root
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
          className
        )}
        {...field}
        onValueChange={field.onChange}
        {...props}
        ref={ref}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroup.Item
              id={`${name}-${option.value}`}
              value={option.value}
              className={cn(radioVariants({ variant, size }))}
            >
              <RadioGroup.Indicator className="flex items-center justify-center">
                <div
                  className={cn(
                    'rounded-full bg-primary',
                    size === 'sm' ? 'h-1.5 w-1.5' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2'
                  )}
                />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <Label htmlFor={`${name}-${option.value}`} className={labelClassName}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup.Root>
    );
  }
);

RadioSelect.displayName = 'RadioSelect';
