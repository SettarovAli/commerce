import { AuthActionResult } from 'lib/firebase/auth/types';
import { toast } from 'react-toastify';

type Options = {
  authActionResult: AuthActionResult;
  onSuccess?: () => void;
  onError?: () => void;
};

export const handleAuthActionResult = ({ authActionResult, onSuccess, onError }: Options) => {
  const { success, message } = authActionResult;

  if (!success) {
    if (onError) onError();
    if (message) toast.error(message);
  } else {
    if (onSuccess) onSuccess();
    if (message) toast.success(message);
  }
};
