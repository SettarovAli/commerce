import AuthHeader from '@/modules/auth/auth-header';
import SignInForm from '@/modules/sign-in/sign-in-form';
import SignInWithGoogle from '@/modules/sign-in/sign-in-with-google';

const SignIn = () => {
  return (
    <>
      <AuthHeader />
      <SignInForm />
      <SignInWithGoogle />
    </>
  );
};

export default SignIn;
