import { FirebaseError } from 'firebase/app';
import { AuthActionResult } from 'lib/firebase/auth/types';
import { getFirebaseErrorMessage } from 'lib/firebase/auth/utils/get-firebase-error-message';
import { getErrorMessage } from 'lib/utils/get-error-message';

export const withAuthErrors = async (action: () => Promise<AuthActionResult>) => {
  try {
    return await action();
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, message: getFirebaseErrorMessage(error) };
    }
    return { success: false, message: getErrorMessage(error) };
  }
};
