import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ErrorPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
      </CardHeader>
      <CardContent>Something went wrong.</CardContent>
    </Card>
  );
}
