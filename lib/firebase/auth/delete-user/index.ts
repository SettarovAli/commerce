import { auth } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { Routes } from '@/routes';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const deleteUserFromFirestore = async (
  router: AppRouterInstance,
  isEmailUser: boolean,
  isGoogleUser: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  password?: string
) => {
  try {
    const user = auth?.currentUser;
    if (!user) return;

    setIsLoading(true);

    if (isGoogleUser) {
      const googleProvider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, googleProvider);
      await deleteUser(user);
      toast.success('Your account has been deleted.');
      router.push(Routes.Home);
      return;
    }

    if (isEmailUser) {
      if (!password) {
        toast.error('Please enter your password');
        return;
      }
      const userEmail = user.email as string;
      const credential = EmailAuthProvider.credential(userEmail, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      toast.success('Your account has been deleted.');
      router.push(Routes.Home);
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
