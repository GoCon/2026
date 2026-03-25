export const withBaseURL = (path: string) => {
  const baseURL = import.meta.env.BASE_URL;
  if (baseURL === "/") {
    return `/${path}`;
  } else {
    return `${baseURL}/${path}`;
  }
};
