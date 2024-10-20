'use client';

import Loading from 'components/loading';
import { authService } from 'lib/firebase/auth/service';
import ResetPasswordForm from 'modules/reset-password/reset-password-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Routes } from 'routes';

const ResetPassword = () => {
  const [actionCode, setActionCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const verifyActionCode = async (actionCode: string) => {
      const res = await authService.verifyResetPasswordCode(actionCode);

      if (!res.success) {
        setError(res?.message || 'Something went wrong');
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

  if (!isVerified && !error) return <Loading />;

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
