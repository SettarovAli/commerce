import AuthHeader from '@/modules/auth/auth-header';
import SignUpForm from '@/modules/sign-up/sign-up-form';

const SignUp = () => {
  return (
    <>
      <AuthHeader isSignUpPage />
      <SignUpForm />
    </>
  );
};

export default SignUp;
