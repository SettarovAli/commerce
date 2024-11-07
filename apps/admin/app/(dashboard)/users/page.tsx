import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateUserForm } from '@/modules/users/components/create-user-form';

export default function UsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>Create new admin user</CardContent>
      <CardContent>
        <CreateUserForm />
      </CardContent>
    </Card>
  );
}
