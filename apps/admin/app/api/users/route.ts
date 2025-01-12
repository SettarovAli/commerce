import { UsersService } from '@/lib/users/service';
import { createUserSchema } from '@/lib/users/schemas';
import { validateRequestBody } from '@/lib/utils/validate-request-body';
import { validateSession } from '@/lib/utils/validate-session';
import { handleErrorsAsync } from '@/lib/utils/handle-errors-async';

export async function POST(req: Request) {
  return handleErrorsAsync(async () => {
    await validateSession(req);
    return validateRequestBody(req, createUserSchema, async (data) => {
      const user = await UsersService.createUser(data);
      return Response.json({ data: user });
    });
  });
}
