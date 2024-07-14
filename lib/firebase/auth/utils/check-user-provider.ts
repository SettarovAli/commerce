import { auth } from '@/lib/firebase';

export const checkUserProvider = () => {
  const isEmailUser = auth.currentUser?.providerData.some(
    (provider) => provider.providerId === 'password'
  );
  const isGoogleUser = auth.currentUser?.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  return { isEmailUser, isGoogleUser };
};
