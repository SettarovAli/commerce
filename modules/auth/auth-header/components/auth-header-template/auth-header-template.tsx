import Link from 'next/link';
import { Routes } from 'routes';

type Props = {
  headline: string;
  question: string;
  linkHref: Routes;
  linkText: string;
};

const AuthHeaderTemplate: React.FC<Props> = (props) => {
  const { headline, question, linkHref, linkText } = props;

  return (
    <>
      <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">{headline}</h2>
      <p className="mb-4 mt-2 text-sm leading-6">
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

export default AuthHeaderTemplate;
