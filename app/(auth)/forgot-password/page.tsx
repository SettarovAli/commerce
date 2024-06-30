import ForgotPasswordForm from '@/modules/forgot-password/forgot-password-form';

const ForgotPassword = () => {
  return (
    <>
      <h2 className="mb-4 mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset password
      </h2>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
