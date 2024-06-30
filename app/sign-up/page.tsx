import AuthHeader from '@/modules/auth/auth-header';
import AuthLayout from '@/modules/auth/auth-layout';
import SignUpForm from '@/modules/sign-up/sign-up-form';

const SignUp = () => {
  return (
    <AuthLayout>
      <AuthHeader isSignUpPage />
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
