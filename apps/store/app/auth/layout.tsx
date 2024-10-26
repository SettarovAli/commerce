import Image from 'next/image';
import { PropsWithChildren } from 'react';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-[calc(100vh-76px)] flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:flex-none xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/login-bg.jpg"
          alt="Commerce"
          className="absolute inset-0 h-full w-full object-cover"
          fill
        />
      </div>
    </div>
  );
};

export default AuthLayout;
