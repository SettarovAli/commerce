import 'server-only';

import { verifySession } from 'lib/jwt/session';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.userId),

      // Explicitly return the columns you need rather than the whole user object
      columns: {
        id: true,
        name: true,
        email: true
      }
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
