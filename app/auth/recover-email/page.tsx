'use client';

import { recoverEmail } from '@/lib/firebase/auth/email';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const [restoredEmail, setRestoredEmail] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const recover = async (actionCode: string) => {
      const res = await recoverEmail(actionCode);

      if (res?.error) {
        setError(res.error);
        return;
      }

      if (res?.restoredEmail) {
        setError('');
        setRestoredEmail(res.restoredEmail);
      }
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
      {restoredEmail && (
        <p>
          Your sign-in email address has been changed back to{' '}
          <span className="font-bold">{restoredEmail}</span>. If you didn’t ask to change your
          sign-in email, it’s possible someone is trying to access your account and you should
          change your password right away.
        </p>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default ResetPassword;
