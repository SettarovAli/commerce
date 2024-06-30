import AuthHeader from '@/modules/auth/auth-header';
import AuthLayout from '@/modules/auth/auth-layout';
import SignInForm from '@/modules/sign-in/sign-in-form';

const SignIn = () => {
  return (
    <AuthLayout>
      <AuthHeader />
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
