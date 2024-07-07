import LoadingDots from '@/components/loading-dots';
import clsx from 'clsx';

type Props = {
  variant?: 'red';
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = (props) => {
  const { children, className, disabled, variant, isLoading, ...rest } = props;

  return (
    <button
      className={clsx(
        'flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-blue-500 disabled:opacity-50',
        className,
        {
          'bg-red-600 hover:bg-red-500': variant === 'red'
        }
      )}
      disabled={isLoading || disabled}
      {...rest}
    >
      {children}
      {isLoading && <LoadingDots className="bg-white" />}
    </button>
  );
};

export default Button;
