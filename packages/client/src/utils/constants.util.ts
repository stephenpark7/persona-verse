const ENV = {
  API_PROTOCOL: import.meta.env.VITE_API_PROTOCOL as string,
  API_HOST_NAME: import.meta.env.VITE_API_HOST_NAME as string,
  API_PORT: import.meta.env.VITE_API_PORT as string,
};

export const BASE_API_URL: string = `${ENV.API_PROTOCOL}://${ENV.API_HOST_NAME}:${ENV.API_PORT}/api/`;
