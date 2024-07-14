import { auth, googleAuthProvider } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { Routes } from '@/routes';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const signInUserWithGoogle = async (router: AppRouterInstance) => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    if (!result || !result.user) {
      toast.error('No user found');
    }
    const user = result.user;
    toast.success(`Welcome ${user.displayName}!`);
    router.push(Routes.Home);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.log(error);
  }
};
