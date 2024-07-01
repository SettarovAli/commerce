import { auth } from '@/lib/firebase';
import { generateFirebaseAuthErrorMessage } from '@/lib/firebase/auth/error-handler';
import { Routes } from '@/routes';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateEmail
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    toast.success(
      `A verification email has been sent to your email address ${name}. Please verify your email to login.`
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user.emailVerified === false) {
      return toast.error('Please verify your email to login.');
    }
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if (!auth.currentUser) return;
    setIsLoading(true);

    // Reauthenticate the user before updating the email
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Update the email after successful reauthentication
    await updateEmail(auth.currentUser, newEmail);

    // Send email verification to the new email
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `A verification email has been sent to your new email address ${newEmail}. Please verify your email to login.`
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(generateFirebaseAuthErrorMessage(error));
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
