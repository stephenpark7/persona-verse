// import { toast } from 'react-toastify';
import * as fetchIntercept from 'fetch-intercept';
// import { refreshToken } from './refresh';

const useFetchIntercept = (): void => {
  fetchIntercept.register({
    request: function (url, config) {
      config.headers = config.headers || {};
      return [ url, config ];
    },
    requestError: function (error) {
      return Promise.reject(error);
    },
    response: function (response) {
      // if (response.status !== 401 || response.url.endsWith('/login')) {
      //   return response;
      // }
      // try {
      //   const responseData = refreshToken();

      //   if (!responseData) {
      //     throw new Error('Error refreshing token.');
      //   }

      //   response.json = async () => responseData;
      //   return response;
      // } catch (error) {
      //   toast.error('Session expired. Please log in again.');
      //   return response;
      // }
      return response;
    },
    responseError: function (error) {
      return Promise.reject(error);
    },
  })
};

export default useFetchIntercept;

// import { toast } from 'react-toastify';
// import * as fetchIntercept from 'fetch-intercept';
// import { FetchInterceptorResponse } from 'fetch-intercept';
// import { refreshToken } from './refresh';
// // import { apiCall } from '.';

// const useFetchIntercept = (): void => {
//   fetchIntercept.register({
//     request: function (url, config) {
//       console.log(url, config);
//       return [ url, config ];
//     },
//     requestError: function (error) {
//       toast.error(error.message);
//       return Promise.reject(error);
//     },
//     response: function (response): FetchInterceptorResponse {
//       try {
//         const clonedResponse = response.clone();

//         if (response.status === 401 &&
//           response.url.endsWith('/refresh')
//         ) {
//           throw new Error;
//         }
//         if (response.status !== 401 ||
//           response.url.endsWith('/login') ||
//           response.url.endsWith('/register')) {
//           return response;
//         }
//         if (response.status === 401) {
//           // const json = () => refreshToken().then((res) => clonedResponse.json().then((data) => ({ ...data, 
//           //   headers: {
//           //     ...clonedResponse.headers,
//           //     'Authorization': `Bearer ${res?.token}`,
//           //   }}
//           // )));
//           const json = () =>
//             clonedResponse
//               .json()
//               .then((data) => ({ ...data, headers: {
//                 ...clonedResponse.headers,
//                 'Authorization': `Bearer ${data.token}`,
//               }}
//             ));

//           console.log(response);
//           console.log(clonedResponse);
//           return { ...response, headers: {
//             ...response.headers,
//             'Authorization': `Bearer ${response.token}`,
//           } };

//           // refreshToken().then((res) => {
//           //   if (!res?.token) {
//           //     throw new Error('Error refreshing token.');
//           //   }
//           //   const json = () => clonedResponse.json().then((data) => ({ ...data, headers: {
//           //     ...response.headers,
//           //     'Authorization': `Bearer ${res.token}`,
//           //   }}));
//           //   response.json = json;
//           //   return response;
//           //   // console.log(response);
//           //   // const request = new Request(response.url, {
//           //   //   headers: {
//           //   //     ...response.headers,
//           //   //     'Authorization': `Bearer ${res.token}`,
//           //   //   },
//           //   // });
//           //   // console.log(request);
//           //   // return request;
//           // });
//         }
//         return response;
//       } catch (error) {
//         toast.error('Session expired. Please log in again.');
//         return response;
//       }
//     },
//     responseError: function (error) {
//       toast.error(error.message);
//       return Promise.reject(error);
//     },
//   })
// };

// export default useFetchIntercept;

