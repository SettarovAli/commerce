import { auth } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { checkUserProvider } from '@/lib/firebase/auth/utils/check-user-provider';
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  password?: string
) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const { isEmailUser, isGoogleUser } = checkUserProvider();

    setIsLoading(true);

    if (isGoogleUser) {
      const googleProvider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, googleProvider);
      await deleteUser(user);
      toast.success('Your account has been deleted.');
      router.push(Routes.SignIn);
      return;
    }

    if (isEmailUser && user.email && password) {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      toast.success('Your account has been deleted.');
      router.push(Routes.SignIn);
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
