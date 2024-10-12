'use client';

import LoadingDots from 'components/loading-dots';
import { authService } from 'lib/firebase/auth/service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Routes } from 'routes';

const RecoverEmail = () => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const recover = async (actionCode: string) => {
      const res = await authService.recoverEmail(actionCode);
      if (res.message) setMessage(res.message);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get('oobCode');

    if (!actionCode) {
      return router.push(Routes.SignIn);
    }

    recover(actionCode);
  }, [router]);

  if (!message) {
    return (
      <div className="flex justify-center">
        <LoadingDots className="h-3 w-3 bg-black dark:bg-white" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4 mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Restoring email address
      </h2>
      {message && <p>{message}</p>}
    </>
  );
};

export default RecoverEmail;
