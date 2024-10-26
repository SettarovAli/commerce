import AuthHeaderTemplate from 'modules/auth/auth-header/components/auth-header-template';
import { Routes } from 'routes';

type Props = {
  isSignUpPage?: boolean;
};

const AuthHeader: React.FC<Props> = ({ isSignUpPage }) => {
  return (
    <AuthHeaderTemplate
      headline={isSignUpPage ? 'Sign up for an account' : 'Sign in to your account'}
      question={isSignUpPage ? 'Are you a member?' : 'Not a member?'}
      linkHref={isSignUpPage ? Routes.SignIn : Routes.SignUp}
      linkText={isSignUpPage ? 'Sign In' : 'Sign Up'}
    />
  );
};

export default AuthHeader;
