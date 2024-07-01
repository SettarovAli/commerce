import Button from '@/components/button';
import { signOutUser } from '@/lib/firebase/auth/sign-out';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b  pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7">Sign Out</h2>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <div className="w-1/2">
              <Button type="button" onClick={() => signOutUser(router)}>
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
