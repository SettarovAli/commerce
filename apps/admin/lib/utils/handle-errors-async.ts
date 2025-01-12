import { parseError } from '@/lib/utils/parse-error';

export async function handleErrorsAsync(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (error: unknown) {
    const { message, statusCode } = parseError(error);
    return Response.json({ message }, { status: statusCode });
  }
}
