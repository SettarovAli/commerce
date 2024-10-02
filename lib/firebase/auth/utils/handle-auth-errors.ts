import { getErrorMessage } from '@/lib/utils/get-error-message';
import { FirebaseError } from 'firebase/app';
import { getFirebaseErrorMessage } from './get-firebase-error-message';

export const handleAuthErrors = async (
  action: () => Promise<{ success: boolean; notification?: string }>
) => {
  try {
    return await action();
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, notification: getFirebaseErrorMessage(error) };
    }
    return { success: false, notification: getErrorMessage(error) };
  }
};
