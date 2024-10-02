'use client';

import { recoverEmail } from '@/lib/firebase/auth/actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const [message, setMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const recover = async (actionCode: string) => {
      const res = await recoverEmail(actionCode);
      if (res.notification) setMessage(res.notification);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get('oobCode');

    if (!actionCode) {
      return router.push(Routes.SignIn);
    }

    recover(actionCode);
  }, [router]);

  return (
    <>
      <h2 className="mb-4 mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Restoring email address
      </h2>
      {message && <p>{message}</p>}
    </>
  );
};

export default ResetPassword;
