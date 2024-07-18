'use client';

import LoadingDots from '@/components/loading-dots';
import { auth } from '@/lib/firebase';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {
  redirectLoggedInUser?: boolean;
};

const AuthUser: React.FC<PropsWithChildren<Props>> = ({ children, redirectLoggedInUser }) => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const withoutUserRedirect = (!user || !user?.emailVerified) && !redirectLoggedInUser;
  const withUserRedirect = user && redirectLoggedInUser;

  useEffect(() => {
    if (withoutUserRedirect) {
      router.push(Routes.SignIn);
    }
    if (withUserRedirect) {
      router.push(Routes.Account);
    }
  }, [router, withUserRedirect, withoutUserRedirect]);

  if (loading || withoutUserRedirect || withUserRedirect)
    return (
      <div className="flex justify-center">
        <LoadingDots className="h-3 w-3 bg-black dark:bg-white" />
      </div>
    );

  return children;
};

export default AuthUser;
