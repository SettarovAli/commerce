import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServerErrorPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>500 - Internal Server Error</CardTitle>
      </CardHeader>
      <CardContent>Something went wrong.</CardContent>
    </Card>
  );
}
