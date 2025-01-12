import { z } from 'zod';

export async function validateRequestBody<T>(
  req: Request,
  schema: z.Schema<T>,
  fn: (data: T) => Promise<Response>
): Promise<Response> {
  const body = await req.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    return Response.json({ errors: result.error.flatten().fieldErrors }, { status: 500 });
  }

  return fn(result.data);
}
