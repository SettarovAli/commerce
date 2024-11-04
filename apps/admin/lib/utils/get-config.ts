const { NEXT_PUBLIC_BASE_PATH } = process.env;

export const getConfig = () => {
  return { basePath: NEXT_PUBLIC_BASE_PATH };
};
