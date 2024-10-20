'use client';

import Loading from 'components/loading';
import { useAuthRedirect } from 'hooks/use-auth-redirect';
import { PropsWithChildren } from 'react';
import { Routes } from 'routes';

const AuthLoginLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { user, loading } = useAuthRedirect(true, Routes.Home);

  if (loading || user) return <Loading />;

  return children;
};

export default AuthLoginLayout;
