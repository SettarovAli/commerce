import { ZodType } from 'zod';

export type ZObjectType = ZodType<Record<string, unknown>>;

export type ZodParams<T extends ZObjectType> = {
  data: Record<string, unknown>;
  schema: T;
};

export type ValidationSuccessRes = {
  success: true;
  data: Record<string, unknown>;
};

export type ValidationFailureRes = {
  success: false;
  errors: Record<string, string[] | undefined>;
};
