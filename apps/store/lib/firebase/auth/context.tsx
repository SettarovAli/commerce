'use client';

import { User } from 'firebase/auth';
import { authService } from 'lib/firebase/auth/service';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
AuthContext.displayName = 'AuthContext';

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isGuest = !user || !user?.emailVerified;

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading, isGuest }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
