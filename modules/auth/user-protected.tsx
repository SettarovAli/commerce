'use client';

import Loading from 'components/loading';
import { useAuthRedirect } from 'hooks/use-auth-redirect';
import React, { PropsWithChildren } from 'react';
import { Routes } from 'routes';

const UserProtected: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { isGuest, loading } = useAuthRedirect(false, Routes.SignIn);

  if (loading || isGuest) return <Loading className="mt-[40vh]" />;

  return children;
};

export default UserProtected;
