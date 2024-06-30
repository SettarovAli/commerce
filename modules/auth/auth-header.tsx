import { Routes } from '@/routes';
import Link from 'next/link';

type AuthHeaderTemplateProps = {
  headline: string;
  question: string;
  linkHref: Routes;
  linkText: string;
};

const AuthHeaderTemplate: React.FC<AuthHeaderTemplateProps> = (props) => {
  const { headline, question, linkHref, linkText } = props;

  return (
    <>
      <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">{headline}</h2>
      <p className="mb-4 mt-2 text-sm leading-6 text-gray-500">
        {question}
        <Link
          href={linkHref}
          className="ms-2 cursor-pointer font-semibold text-blue-600 hover:text-blue-500"
        >
          {linkText}
        </Link>
      </p>
    </>
  );
};

type Props = {
  isSignUpPage?: boolean;
};

const AuthHeader: React.FC<Props> = ({ isSignUpPage }) => {
  if (isSignUpPage) {
    return (
      <AuthHeaderTemplate
        headline="Sign up for an account"
        question="Are you a member?"
        linkHref={Routes.SignIn}
        linkText="Sign In"
      />
    );
  }

  return (
    <AuthHeaderTemplate
      headline="Sign in to your account"
      question="Not a member?"
      linkHref={Routes.SignUp}
      linkText="Sign Up"
    />
  );
};

export default AuthHeader;
