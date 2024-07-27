// import { store, set, clearUserData } from '../stores';
// import API from '../api';

// interface JWT {
//   token: string;
// }

// interface Config extends RequestInit {
//   headers?: HeadersInit;
// }

// export const fetchIntercept = async (originalFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, jwt: JWT | null, setJWT: React.Dispatch<React.SetStateAction<JWT>>) => (async (...args: [RequestInfo, Config?]): Promise<Response> => {
//   const [ resource, config = {} ] = args;
//   const url = resource.toString().replace(`http://${process.env.API_HOST_NAME}:${process.env.API_PORT}`, '');
//   if (url.startsWith('/api') && !url.startsWith('/api/signup') && !url.startsWith('/api/login')) {
//     if (jwt) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${jwt.token}`,
//       };
//       try {
//         let response = await originalFetch(resource, config);
//         if (response.status === 401) {
//           const data = await API.refreshToken();
//           if (data) {
//             store.dispatch(set(data));
//             setJWT(data);
//             config.headers = {
//               ...config.headers,
//               Authorization: `Bearer ${data.token}`,
//             };
//             response = await originalFetch(resource, config);
//             return response;
//           } else {
//             throw new Error('Error refreshing token.');
//           }
//         }
//         return response;
//       } catch (error: unknown) {
//         // clearUserData(setJWT);
//         throw new Error('Error refreshing token.');
//       }
//     }
//   }
//   return originalFetch(resource, config);
// });
