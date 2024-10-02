import { useState } from 'react';
import { toast } from 'react-toastify';

type Options = {
  authAction: (formData: FormData) => Promise<unknown>;
  clientAction?: (data: Record<string, string>) => Promise<{
    success: boolean;
    notification?: string;
  }>;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useAuthAction = ({ authAction, clientAction, onSuccess, onError }: Options) => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const action = async (formData: FormData) => {
    const { validation, actionRes } = await authAction(formData);

    if (validation.errors) {
      setErrors(validation.errors);
    } else {
      setErrors({});

      let actionResult = actionRes;
      if (clientAction) {
        actionResult = await clientAction(validation.data);
      }

      if (actionResult) {
        const { success, notification } = actionResult;
        if (!success) {
          if (notification) toast.error(notification);
          if (onError) onError();
        } else {
          if (notification) toast.success(notification);
          if (onSuccess) onSuccess();
        }
      }
    }
  };

  return { action, errors };
};
