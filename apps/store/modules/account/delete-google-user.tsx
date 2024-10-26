import Button from 'components/button';
import { authService } from 'lib/firebase/auth/service';
import { handleAuthActionResult } from 'lib/firebase/auth/utils/handle-auth-action-result';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Routes } from 'routes';

const DeleteGoogleUser: React.FC = () => {
  const router = useRouter();

  const handleDeleteGoogleUser = useCallback(async () => {
    const authActionResult = await authService.deleteGoogleUser();
    handleAuthActionResult({
      authActionResult,
      onSuccess: () => {
        router.push(Routes.SignIn);
      }
    });
  }, [router]);

  return (
    <Button type="button" onClick={handleDeleteGoogleUser} variant="red">
      Confirm delete
    </Button>
  );
};

export default DeleteGoogleUser;
