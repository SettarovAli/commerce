import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth/dal';

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>{`Email: ${user.email}`}</CardContent>
    </Card>
  );
}
