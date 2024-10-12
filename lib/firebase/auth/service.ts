import {
  EmailAuthProvider,
  GoogleAuthProvider,
  User,
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
import { auth, googleAuthProvider } from 'lib/firebase';
import { AuthActionResult } from 'lib/firebase/auth/types';
import { withAuthErrors } from 'lib/firebase/auth/utils/with-auth-errors';

class AuthService {
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  async signUp(name: string, email: string, password: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, {
        displayName: name
      });
      await sendEmailVerification(user);
      return {
        success: true,
        message: `A verification email has been sent to your email address, ${name}. Please verify your email to login.`
      };
    });
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified === false) {
        return {
          success: false,
          message: 'Please verify your email to login.'
        };
      }
      return {
        success: true,
        message: `Welcome, ${user.displayName}!`
      };
    });
  }

  async signInWithGoogle() {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const result = await signInWithPopup(auth, googleAuthProvider);
      if (!result || !result.user) throw new Error('User not found');
      const user = result.user;
      return {
        success: true,
        message: `Welcome ${user.displayName}!`
      };
    });
  }

  async verifyEmail(actionCode: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      await applyActionCode(auth, actionCode);
      return {
        success: true,
        message: 'Your email has been verified'
      };
    });
  }

  async recoverEmail(actionCode: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const info = await checkActionCode(auth, actionCode);
      const restoredEmail = info['data']['email']!;
      await applyActionCode(auth, actionCode);
      await sendPasswordResetEmail(auth, restoredEmail);
      return {
        success: true,
        message: `Your sign-in email address has been changed back to ${restoredEmail}. If you didn’t ask to change your sign-in email, it’s possible someone is trying to access your account and you should change your password right away.`
      };
    });
  }

  async updateEmail(newEmail: string, password: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const user = this.getCurrentUser();
      if (!user || !user.email) throw new Error('User not found');
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
      await sendEmailVerification(user);
      return {
        success: true,
        message: `A verification email has been sent to your new email address ${newEmail}. Please verify your email to login.`
      };
    });
  }

  async resetForgotPassword(email: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'A link to reset password has been sent to your email address.'
      };
    });
  }

  async updatePassword(password: string, newPassword: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const user = this.getCurrentUser();
      if (!user) throw new Error('User not found');
      const credential = EmailAuthProvider.credential(user.email as string, password);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      return {
        success: true,
        message: 'Password has been updated successfully'
      };
    });
  }

  async verifyResetPasswordCode(actionCode: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      await verifyPasswordResetCode(auth, actionCode);
      return { success: true };
    });
  }

  async resetPassword(actionCode: string, newPassword: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      await confirmPasswordReset(auth, actionCode, newPassword);
      return {
        success: true,
        message: 'Password has been reseted successfully'
      };
    });
  }

  async deleteEmailUser(password: string) {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const user = this.getCurrentUser();
      if (!user || !user.email) throw new Error('User not found');
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      return {
        success: true,
        message: 'Your account has been deleted.'
      };
    });
  }

  async deleteGoogleUser() {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      const user = this.getCurrentUser();
      if (!user) throw new Error('User not found');
      const googleProvider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, googleProvider);
      await deleteUser(user);
      return {
        success: true,
        message: 'Your account has been deleted.'
      };
    });
  }

  async signOut() {
    return await withAuthErrors(async (): Promise<AuthActionResult> => {
      await signOut(auth);
      return {
        success: true,
        message: 'You have been signed out.'
      };
    });
  }
}

export const authService = new AuthService();
