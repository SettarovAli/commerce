import 'server-only';

import { DatabaseReference, DataSnapshot, get, ref, set } from 'firebase/database';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/firebase';
import { CreateUserSchema } from '@/lib/users/schemas';

class UsersService {
  private static sanitizeEmailForKey(email: string): string {
    // Replace invalid characters for Firebase Realtime Database keys with underscores
    return email.replace(/[.#$[\]]/g, '_');
  }

  static getUserRef(userId: string): { userRef: DatabaseReference } {
    const userRef = ref(db, `users/${userId}`);
    return { userRef };
  }

  static async getUserSnapshot(
    userRef: DatabaseReference
  ): Promise<{ userSnapshot: DataSnapshot; isUserSnapshotExists: boolean }> {
    const userSnapshot = await get(userRef);
    const isUserSnapshotExists = userSnapshot.exists();
    return { userSnapshot, isUserSnapshotExists };
  }

  static getEmailRef(email: string): { emailRef: DatabaseReference } {
    const sanitizedEmail = this.sanitizeEmailForKey(email);
    const emailRef = ref(db, `emails/${sanitizedEmail}`);
    return { emailRef };
  }

  static async getEmailSnapshot(
    emailRef: DatabaseReference
  ): Promise<{ emailSnapshot: DataSnapshot; isEmailSnapshotExists: boolean }> {
    const emailSnapshot = await get(emailRef);
    const isEmailSnapshotExists = emailSnapshot.exists();
    return { emailSnapshot, isEmailSnapshotExists };
  }

  static async createUser({ name, email, password, role }: CreateUserSchema): Promise<{
    message: string;
  }> {
    const { emailRef } = this.getEmailRef(email);
    const { isEmailSnapshotExists } = await this.getEmailSnapshot(emailRef);

    if (isEmailSnapshotExists) {
      throw new Error('Email already exists, please use a different email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    const { userRef } = this.getUserRef(userId);
    await set(userRef, {
      createdAt: Date.now(),
      name,
      email,
      password: hashedPassword,
      role
    });

    await set(emailRef, userId);

    return { message: `User ${name} successfully created.` };
  }
}

export { UsersService };
