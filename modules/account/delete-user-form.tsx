import { checkUserProvider } from '@/lib/firebase/auth/utils/check-user-provider';
import DeleteEmailUser from '@/modules/account/delete-email-user';
import DeleteGoogleUser from '@/modules/account/delete-google-user';

const DeleteUserForm: React.FC = () => {
  const { isEmailUser, isGoogleUser } = checkUserProvider();

  return (
    <>
      {isEmailUser && <DeleteEmailUser />}
      {isGoogleUser && <DeleteGoogleUser />}
    </>
  );
};

export default DeleteUserForm;
