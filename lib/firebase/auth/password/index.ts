import { auth } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { Routes } from '@/routes';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  confirmPasswordReset,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
  verifyPasswordResetCode
} from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const forgotPassword = async (
  email: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    setIsLoading(true);
    await sendPasswordResetEmail(auth, email);
    toast.success('A link to reset password has been sent to your email address.');
    router.push(Routes.SignIn);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onCloseModal: () => void
) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    setIsLoading(true);
    const credential = EmailAuthProvider.credential(user.email as string, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    onCloseModal();
    toast.success('Password has been updated successfully');
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export const verifyResetPasswordCode = async (actionCode: string) => {
  try {
    const email = await verifyPasswordResetCode(auth, actionCode);
    return { email };
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      return { error: generateFirebaseAuthErrorMessage(error) };
    }
  }
};

export const resetPassword = async (
  actionCode: string,
  newPassword: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    setIsLoading(true);
    await confirmPasswordReset(auth, actionCode, newPassword);
    toast.success('Password has been reseted successfully');
    router.push(Routes.SignIn);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
