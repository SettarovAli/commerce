import { auth } from '@/lib/firebase';
import { Routes } from '@/routes';
import { signOut } from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const signOutUser = async (router: AppRouterInstance) => {
  try {
    await signOut(auth);
    toast.success('You have been signed out.');
    router.push(Routes.Home);
  } catch (error) {
    console.error(error);
  }
};
