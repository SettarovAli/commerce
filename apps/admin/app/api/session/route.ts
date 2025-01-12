import { AuthService } from '@/lib/auth/service';
import { signInSchema } from '@/lib/auth/schemas';
import { validateRequestBody } from '@/lib/utils/validate-request-body';
import { handleErrorsAsync } from '@/lib/utils/handle-errors-async';

export async function POST(req: Request) {
  return handleErrorsAsync(() =>
    validateRequestBody(req, signInSchema, async (data) => {
      const session = await AuthService.getSession(data);
      return Response.json({ session });
    })
  );
}
