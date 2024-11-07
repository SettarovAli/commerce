import 'server-only';

import { get, ref } from 'firebase/database';
import bcrypt from 'bcrypt';

import { db } from '@/lib/firebase';
import { createSession, deleteSession, verifySession } from '@/lib/auth/session';
import { SignInSchema } from '@/lib/auth/schemas';
import { User } from '@/lib/auth/types';

class AuthService {
  static async getCurrentUserData(): Promise<User | undefined> {
    const { userId } = await verifySession();
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      await deleteSession();
    }
  }

  static async signIn({ email, password }: SignInSchema): Promise<{
    message: string;
  }> {
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    let userId: string | null = null;
    let userData: User | null = null;

    usersSnapshot.forEach((snapshot) => {
      const data = snapshot.val();
      if (data.email === email) {
        userId = snapshot.key;
        userData = data;
      }
    });

    if (!userData || !userId) {
      throw new Error('User not found');
    }

    const { password: hashedPassword, name } = userData as User;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    await createSession(userId);

    return { message: `Hello, ${name}!` };
  }

  static async signOut() {
    await deleteSession();
  }
}

export { AuthService };
