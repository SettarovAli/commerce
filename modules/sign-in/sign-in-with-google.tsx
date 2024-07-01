'use client';

import { signInUserWithGoogle } from '@/lib/firebase/auth/google';
import { useRouter } from 'next/navigation';

const SignInWithGoogle = () => {
  const router = useRouter();

  return (
    <>
      <div className="mt-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-2 text-gray-900">Or continue with</span>
          </div>
        </div>
      </div>
      <div
        className="mt-6 grid cursor-pointer grid-cols-1"
        onClick={() => signInUserWithGoogle(router)}
      >
        <a className="flex w-full items-center justify-center gap-3 rounded-md bg-[#020202] px-3 py-1.5 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#020202]">
          <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 210 210">
            <path
              d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
	c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
	S0,162.897,0,105z"
            />
          </svg>
          <span className="text-sm font-semibold leading-6">Google</span>
        </a>
      </div>
    </>
  );
};

export default SignInWithGoogle;
