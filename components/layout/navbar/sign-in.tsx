'use client';

import { ArrowRightEndOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import { useAuthContext } from 'lib/firebase/auth/context';
import { checkUserProvider } from 'lib/firebase/auth/utils/check-user-provider';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from 'routes';

const SignIn: React.FC = () => {
  const { user, loading, isGuest } = useAuthContext();

  const { isGoogleUser } = checkUserProvider();

  if (loading) {
    return <LoadingDots className="bg-black dark:bg-white" />;
  }

  if (isGuest) {
    return (
      <Link href={Routes.SignIn} className="flex shrink-0 items-center gap-1 hover:opacity-70">
        <span className="hidden sm:block">Log in</span>
        <ArrowRightEndOnRectangleIcon className="h-5" />
      </Link>
    );
  }

  return (
    <Link href={Routes.Account} className="flex items-center gap-1 hover:opacity-70">
      <span className="hidden sm:block">Account</span>
      {isGoogleUser && user?.photoURL ? (
        <span className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src={user.photoURL} alt="User avatar" fill />
        </span>
      ) : (
        <UserCircleIcon className="h-5" />
      )}
    </Link>
  );
};

export default SignIn;
