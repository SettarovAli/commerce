import { auth, googleAuthProvider } from '@/lib/firebase';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  applyActionCode,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  verifyPasswordResetCode
} from 'firebase/auth';
import { handleAuthErrors } from './utils/handle-auth-errors';

export const signUpUser = async (name: string, email: string, password: string) => {
  const action = async () => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName: name
    });
    await sendEmailVerification(user);
    return {
      success: true,
      notification: `A verification email has been sent to your email address, ${name}. Please verify your email to login.`
    };
  };
  return await handleAuthErrors(action);
};

export const loginUserWithEmailAndPassword = async (email: string, password: string) => {
  const action = async () => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user.emailVerified === false) {
      return { success: false, notification: 'Please verify your email to login.' };
    }
    return { success: true, notification: `Welcome, ${user.displayName}!` };
  };
  return await handleAuthErrors(action);
};

export const signInUserWithGoogle = async () => {
  const action = async () => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    if (!result || !result.user) throw new Error('User not found');
    const user = result.user;
    return { success: true, notification: `Welcome ${user.displayName}!` };
  };
  return await handleAuthErrors(action);
};

export const updateUserEmail = async (newEmail: string, password: string) => {
  const action = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error('User not found');
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    await sendEmailVerification(user);
    return {
      success: true,
      notification: `A verification email has been sent to your new email address ${newEmail}. Please verify your email to login.`
    };
  };
  return await handleAuthErrors(action);
};

export const verifyEmail = async (actionCode: string) => {
  const action = async () => {
    await applyActionCode(auth, actionCode);
    return {
      success: true,
      notification: 'Your email has been verified'
    };
  };
  return await handleAuthErrors(action);
};

export const recoverEmail = async (actionCode: string) => {
  const action = async () => {
    const info = await checkActionCode(auth, actionCode);
    const restoredEmail = info['data']['email']!;
    await applyActionCode(auth, actionCode);
    await sendPasswordResetEmail(auth, restoredEmail);
    return {
      success: true,
      notification: `Your sign-in email address has been changed back to ${restoredEmail}. If you didn’t ask to change your sign-in email, it’s possible someone is trying to access your account and you should change your password right away.`
    };
  };
  return await handleAuthErrors(action);
};

export const resetForgotPassword = async (email: string) => {
  const action = async () => {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      notification: 'A link to reset password has been sent to your email address.'
    };
  };
  return await handleAuthErrors(action);
};

export const updateUserPassword = async (password: string, newPassword: string) => {
  const action = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not found');
    const credential = EmailAuthProvider.credential(user.email as string, password);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    return {
      success: true,
      notification: 'Password has been updated successfully'
    };
  };

  return await handleAuthErrors(action);
};

export const verifyResetPasswordCode = async (actionCode: string) => {
  const action = async () => {
    await verifyPasswordResetCode(auth, actionCode);
    return { success: true };
  };
  return await handleAuthErrors(action);
};

export const resetPassword = async (actionCode: string, newPassword: string) => {
  const action = async () => {
    await confirmPasswordReset(auth, actionCode, newPassword);
    return {
      success: true,
      notification: 'Password has been reseted successfully'
    };
  };
  return await handleAuthErrors(action);
};

export const signOutUser = async () => {
  const action = async () => {
    await signOut(auth);
    return {
      success: true,
      notification: 'You have been signed out.'
    };
  };
  return await handleAuthErrors(action);
};

export const deleteEmailUser = async (password: string) => {
  const action = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error('User not found');
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
    return {
      success: true,
      notification: 'Your account has been deleted.'
    };
  };
  return await handleAuthErrors(action);
};

export const deleteGoogleUser = async () => {
  const action = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not found');
    const googleProvider = new GoogleAuthProvider();
    await reauthenticateWithPopup(user, googleProvider);
    await deleteUser(user);
    return {
      success: true,
      notification: 'Your account has been deleted.'
    };
  };
  return await handleAuthErrors(action);
};
