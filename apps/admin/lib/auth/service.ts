import 'server-only';

import bcrypt from 'bcrypt';
import { UsersService } from '@/lib/users/service';
import { deleteSession, encryptSession, setSession, verifySession } from '@/lib/auth/session';
import { SignInSchema } from '@/lib/auth/schemas';
import { User } from '@/lib/auth/types';

class AuthService {
  static async getCurrentUserData(): Promise<User | undefined> {
    const { userId } = await verifySession();
    const { userRef } = UsersService.getUserRef(userId);
    const { userSnapshot, isUserSnapshotExists } = await UsersService.getUserSnapshot(userRef);

    if (isUserSnapshotExists) {
      return userSnapshot.val();
    } else {
      await deleteSession();
    }
  }

  static async getSession(schema: SignInSchema): Promise<string> {
    const { email, password } = schema;

    let userId: string | null = null;
    let userData: User | null = null;

    const { emailRef } = UsersService.getEmailRef(email);
    const { emailSnapshot, isEmailSnapshotExists } = await UsersService.getEmailSnapshot(emailRef);

    if (!isEmailSnapshotExists) {
      throw new Error('User not found');
    }

    const { userRef } = UsersService.getUserRef(emailSnapshot.val());
    const { userSnapshot, isUserSnapshotExists } = await UsersService.getUserSnapshot(userRef);

    if (isUserSnapshotExists) {
      userId = userSnapshot.key;
      userData = userSnapshot.val();
    }

    if (!userData || !userId) {
      throw new Error('User not found');
    }

    const { password: hashedPassword, role } = userData;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const session = await encryptSession({ userId, userRole: role });

    return session;
  }

  static async signIn(schema: SignInSchema): Promise<void> {
    const session = await this.getSession(schema);
    await setSession(session);
  }

  static async signOut() {
    await deleteSession();
  }
}

export { AuthService };
