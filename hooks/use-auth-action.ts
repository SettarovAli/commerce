import { AuthActionResult } from 'lib/firebase/auth/types';
import { handleAuthActionResult } from 'lib/firebase/auth/utils/handle-auth-action-result';
import { ValidationFailureRes, ValidationSuccessRes } from 'lib/zod/types';
import { useState } from 'react';

export const useAuthAction = <T extends Record<string, unknown>>({
  authAction,
  clientAction,
  onSuccess,
  onError
}: {
  authAction: (formData: FormData) => Promise<{
    validation: ValidationSuccessRes | ValidationFailureRes;
    actionRes?: AuthActionResult;
  }>;
  clientAction?: (data: T) => Promise<AuthActionResult>;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  const action = async (formData: FormData) => {
    const { validation, actionRes } = await authAction(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    let authActionResult = actionRes;

    if (clientAction) {
      authActionResult = await clientAction(validation.data as T);
    }

    if (authActionResult) {
      handleAuthActionResult({ authActionResult, onSuccess, onError });
    }
  };

  return { action, errors };
};
