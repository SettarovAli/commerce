'use client';

import Button from 'components/button';
import LoadingDots from 'components/loading-dots';
import { useFormStatus } from 'react-dom';

type Props = {
  variant?: 'red';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton: React.FC<Props> = (props) => {
  const { children, disabled, ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} {...rest}>
      {children}
      {pending && <LoadingDots className="bg-white" />}
    </Button>
  );
};

export default SubmitButton;
