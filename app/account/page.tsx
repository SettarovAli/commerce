'use client';

import LoadingDots from '@/components/loading-dots';
import { auth } from '@/lib/firebase';
import ChangeEmail from '@/modules/account/change-email';
import ChangePassword from '@/modules/account/change-password';
import DeleteUser from '@/modules/account/delete-user';
import SignOut from '@/modules/account/sign-out';
import AuthUser from '@/modules/auth/auth-user';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function AccountLayout() {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div className="mt-[40vh] flex justify-center">
        <LoadingDots className="h-3 w-3 bg-black dark:bg-white" />
      </div>
    );

  const isGoogleUser = user?.providerData[0]?.providerId === 'google.com';

  return (
    <AuthUser>
      <section className="mx-auto max-w-screen-2xl px-4 pb-4">
        <div className="mt-6 flex h-screen flex-col gap-8">
          <h2 className="text-2xl font-bold leading-7 sm:text-3xl">My Account</h2>
          {user && <h3 className="text-lg font-bold sm:text-xl">{user.email}</h3>}
          <SignOut />
          {user && !isGoogleUser && (
            <>
              <ChangeEmail user={user} />
              <ChangePassword />
            </>
          )}
          <DeleteUser />
        </div>
      </section>
    </AuthUser>
  );
}
