import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForbiddenPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>403 - Forbidden</CardTitle>
      </CardHeader>
      <CardContent>You don't have permission to access this page.</CardContent>
    </Card>
  );
}
