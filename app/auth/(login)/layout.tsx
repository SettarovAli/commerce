import AuthUser from '@/modules/auth/auth-user';
import { PropsWithChildren } from 'react';

const AuthLoginLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <AuthUser redirectLoggedInUser>{children}</AuthUser>;
};

export default AuthLoginLayout;
