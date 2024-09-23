import { apiProtocol, httpRequestParams, JsonResponse } from '@schemas';
import type { ApiCallFunction } from '@schemas';
import { displayErrorMessage, displaySuccessMessage } from '@utils';
import { sendHttpRequest } from '.';

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
      console.log(params);
      if (params.action instanceof Function) {
        response = await params.action();
      } else {
        throw new Error('Invalid API action.');
      }
    } else if (protocol === 'rest') {
      response = await sendHttpRequest(params);
    } else {
      throw new Error('Invalid API protocol.');
    }

    if (showToast) {
      displaySuccessMessage(response.message);
    }

    return response as JsonResponse;
  } catch (err) {
    if (params.controller === 'tweets' && params.action === 'get') {
      return;
    }
    displayErrorMessage(err);
    return;
  }
};
