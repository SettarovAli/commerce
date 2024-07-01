'use client';

import { auth } from '@/lib/firebase';
import { Routes } from '@/routes';
import { ArrowRightEndOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Link href={Routes.SignIn} className="flex items-center gap-1 hover:opacity-70">
        Log in <ArrowRightEndOnRectangleIcon className="h-5" />
      </Link>
    );
  }

  return (
    <Link href={Routes.Account} className="flex items-center gap-1 hover:opacity-70">
      <span className="hidden sm:block">Account</span>
      <UserCircleIcon className="h-5" />
    </Link>
  );
};

export default SignIn;
