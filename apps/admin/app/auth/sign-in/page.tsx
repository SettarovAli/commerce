import SignInForm from '@/modules/auth/components/sign-in-form';

const SignInPage = () => {
  return (
    <div className="fixed flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
