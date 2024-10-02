'use client';

import LoadingDots from '@/components/loading-dots';
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

type Props = {
  variant?: 'red';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = (props) => {
  const { children, className, disabled, variant, ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        'flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-blue-500 disabled:opacity-50',
        className,
        {
          'bg-red-600 hover:bg-red-500': variant === 'red'
        }
      )}
      disabled={pending || disabled}
      {...rest}
    >
      {children}
      {pending && <LoadingDots className="bg-white" />}
    </button>
  );
};

export default Button;
