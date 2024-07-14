'use client';

import { verifyEmail } from '@/lib/firebase/auth/email';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const VerifyEmail = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyActionCode = async (actionCode: string) => {
      await verifyEmail(actionCode);
      router.push(Routes.SignIn);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const actionCode = urlParams.get('oobCode');

    if (!actionCode) {
      return router.push(Routes.SignIn);
    }

    verifyActionCode(actionCode);
  }, [router]);

  return null;
};

export default VerifyEmail;
