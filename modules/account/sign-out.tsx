import Button from '@/components/button';
import { signOutUser } from '@/lib/firebase/auth/actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const SignOut = () => {
  const router = useRouter();

  const handleSignOutUser = useCallback(async () => {
    const { success, notification } = await signOutUser();
    if (!success) {
      if (notification) toast.error(notification);
    } else {
      if (notification) toast.success(notification);
      router.push(Routes.SignIn);
    }
  }, [router]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b  pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7">Sign Out</h2>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <div className="w-1/2">
              <Button type="button" onClick={handleSignOutUser}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
