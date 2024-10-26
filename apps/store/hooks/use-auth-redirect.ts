import { useAuthContext } from 'lib/firebase/auth/context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthRedirect = (redirectIfAuthenticated: boolean, redirectTo: string) => {
  const { user, loading, isGuest } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (redirectIfAuthenticated && !isGuest) {
        router.push(redirectTo);
      } else if (!redirectIfAuthenticated && isGuest) {
        router.push(redirectTo);
      }
    }
  }, [isGuest, loading, redirectIfAuthenticated, redirectTo, router]);

  return { user, loading, isGuest };
};
