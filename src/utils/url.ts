export const withBaseURL = (path: string) => {
  const baseURL = import.meta.env.BASE_URL;
  return `${baseURL}/${path}`;
};
