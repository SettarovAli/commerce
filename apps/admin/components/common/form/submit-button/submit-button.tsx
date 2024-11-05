import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/icons';

type Props = {
  text: string;
};

const SubmitButton = (props: Props) => {
  const { text } = props;

  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="relative mt-2 w-full"
      disabled={pending}
      aria-disabled={pending}
    >
      <span>{text}</span>
      {pending && <Spinner variant="light" />}
    </Button>
  );
};

export default SubmitButton;
