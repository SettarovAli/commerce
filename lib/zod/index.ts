import { ZodError, ZodType, z } from 'zod';

export const ValidationMessages = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please provide a valid email',
  PASSWORD: 'Password should be at least 6 characters'
};

export const ValidationFields = {
  REQUIRED: z.string().min(1, ValidationMessages.REQUIRED),
  EMAIL: z.string().email(ValidationMessages.EMAIL),
  PASSWORD: z.string().min(6, ValidationMessages.PASSWORD)
};

const handleError = ({ issues }: ZodError<unknown>) => {
  const formData: Record<string, string> = {};
  if (issues.length === 1 && issues[0] && issues[0].path.length < 1) return issues[0].message;
  issues.forEach(({ path, message }) => {
    formData[path.join('-')] = message;
  });

  return formData;
};

type ZObjectType = ZodType<Record<string | number, unknown>>;

type ZodParams<T extends ZObjectType> = {
  onSuccess: (data: T['_output']) => void;
  onError(error: Partial<Record<keyof T['_output'], string>>): void;
  data: Record<string, unknown>;
  schema: T;
};

export type ValidationError<T extends ZObjectType> = Partial<Record<keyof T['_output'], string>>;

export const handleValidation = <T extends ZObjectType>(params: ZodParams<T>) => {
  const { data, onError, onSuccess, schema } = params;

  try {
    const res = schema.parse(data);
    onSuccess(res);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErr = handleError(error);
      onError(formattedErr as Record<keyof T['_output'], string>);
    } else {
      throw new Error(String(error));
    }
  }
};
