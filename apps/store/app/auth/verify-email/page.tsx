'use client';

import { handleAuthActionResult } from '@/lib/firebase/auth/utils/handle-auth-action-result';
import { authService } from 'lib/firebase/auth/service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Routes } from 'routes';

const VerifyEmail = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyActionCode = async (actionCode: string) => {
      const authActionResult = await authService.verifyEmail(actionCode);
      handleAuthActionResult({ authActionResult });
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
