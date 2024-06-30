import clsx from 'clsx';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, ...rest } = props;

  return (
    <button
      className={clsx(
        'flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-blue-500 disabled:opacity-50'
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
