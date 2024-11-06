export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type User = {
  createdAt: number;
  email: string;
  name: string;
  password: string;
};
