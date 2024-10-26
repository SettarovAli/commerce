import { authService } from 'lib/firebase/auth/service';

export const checkUserProvider = () => {
  const user = authService.getCurrentUser();

  const isEmailUser = user?.providerData.some((provider) => provider.providerId === 'password');
  const isGoogleUser = user?.providerData.some((provider) => provider.providerId === 'google.com');

  return { isEmailUser, isGoogleUser };
};
