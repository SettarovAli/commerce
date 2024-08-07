import { auth } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { Routes } from '@/routes';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  applyActionCode,
  checkActionCode,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updateProfile
} from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    setLoading(true);
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName: name
    });
    await sendEmailVerification(user);
    toast.success(
      `A verification email has been sent to your email address, ${name}. Please verify your email to login.`
    );
    router.push(Routes.SignIn);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    setLoading(true);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user.emailVerified === false) {
      return toast.error('Please verify your email to login.');
    }
    toast.success(`Welcome, ${user.displayName}!`);
    router.push(Routes.Home);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const updateUserEmail = async (
  email: string,
  newEmail: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    setIsLoading(true);
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    await sendEmailVerification(user);
    toast.success(
      `A verification email has been sent to your new email address ${newEmail}. Please verify your email to login.`
    );
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

export const verifyEmail = async (actionCode: string) => {
  try {
    await applyActionCode(auth, actionCode);
    toast.success('Your email has been verified');
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  }
};

export const recoverEmail = async (actionCode: string) => {
  try {
    const info = await checkActionCode(auth, actionCode);
    const restoredEmail = info['data']['email']!;
    await applyActionCode(auth, actionCode);
    await sendPasswordResetEmail(auth, restoredEmail);
    return { restoredEmail };
  } catch (error: any) {
    if (error instanceof FirebaseError) {
      return { error: generateFirebaseAuthErrorMessage(error) };
    }
    console.error(error);
    return { error: error?.message };
  }
};
