import { apiProtocol, httpRequestParams, JsonResponse } from '@schemas';
import type { ApiCallFunction } from '@schemas';
import { displayErrorMessage, displaySuccessMessage } from '@utils';

export const apiCall: ApiCallFunction = async ({
  params,
  showToast,
  protocol,
}): Promise<JsonResponse | void> => {
  try {
    httpRequestParams.parse(params);
    apiProtocol.parse(protocol);

    let response;

    if (protocol === 'trpc') {
      if (params.action instanceof Function) {
        response = await params.action({});
      } else {
        throw new Error('Invalid API action.');
      }
    } else if (protocol === 'rest') {
      throw new Error('REST API not implemented.');
    } else {
      throw new Error('Invalid API protocol.');
    }

    if (showToast) {
      displaySuccessMessage(response.message);
    }

    return response as JsonResponse;
  } catch (err) {
    displayErrorMessage(err);
    return;
  }
};
