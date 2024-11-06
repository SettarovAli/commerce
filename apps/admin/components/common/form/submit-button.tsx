import { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/icons';

type Props = {
  loading: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton = (props: PropsWithChildren<Props>) => {
  const { loading, children, ...rest } = props;

  return (
    <Button
      type="submit"
      className="relative mt-2 w-full"
      disabled={loading}
      aria-disabled={loading}
      {...rest}
    >
      {children}
      {loading && <Spinner variant="light" />}
    </Button>
  );
};

export { SubmitButton };
