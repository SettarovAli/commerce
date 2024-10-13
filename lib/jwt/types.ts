export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
