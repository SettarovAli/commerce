'use client';

import { verifyResetPasswordCode } from '@/lib/firebase/auth/password';
import ResetPasswordForm from '@/modules/reset-password/reset-password-form';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const [actionCode, setActionCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const verifyActionCode = async (actionCode: string) => {
      const res = await verifyResetPasswordCode(actionCode);

      if (res?.error) {
        setError(res.error);
        return;
      }

      setIsVerified(true);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get('oobCode');

    if (!actionCode) {
      return router.push(Routes.SignIn);
    }

    verifyActionCode(actionCode);
    setActionCode(actionCode);
  }, [router]);

  return (
    <>
      <h2 className="mb-4 mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset password
      </h2>
      {isVerified && <ResetPasswordForm actionCode={actionCode} />}
      {error && <p>{error}</p>}
    </>
  );
};

export default ResetPassword;
