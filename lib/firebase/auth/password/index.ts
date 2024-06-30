import { auth } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { Routes } from '@/routes';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const forgotPassword = async (
  email: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    if (email === '') {
      toast.error('Please enter your email address!');
      return;
    }
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
  router: AppRouterInstance
) => {
  try {
    //  check if valid user
    const user = auth.currentUser;
    if (!user) return;
    // check if current password is valid
    if (!currentPassword || currentPassword === '' || currentPassword.length < 6) {
      toast.error('Please enter your current password');
      return;
    }
    // check if new password is valid
    if (!newPassword || newPassword === '') {
      toast.error('Please enter your new password');
      return;
    }
    setIsLoading(true);
    // validate old password
    const credential = EmailAuthProvider.credential(user.email as string, currentPassword);
    // reauthenticate user
    await reauthenticateWithCredential(user, credential);
    // update password
    await updatePassword(user, newPassword);
    router.push(Routes.SignIn);
    toast.success('Password updated successfully');
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  }
};
