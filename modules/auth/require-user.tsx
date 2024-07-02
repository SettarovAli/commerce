'use client';

import { auth } from '@/lib/firebase';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const RequireUser: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const withoutUser = !user || !user?.emailVerified;

  useEffect(() => {
    if (withoutUser) {
      router.push(Routes.SignIn);
    }
  }, [router, withoutUser]);

  if (loading) return <div>Loading...</div>;

  if (withoutUser) return null;

  return children;
};

export default RequireUser;
