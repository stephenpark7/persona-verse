import '@testing-library/jest-dom';
import { refreshToken } from '../api/refresh';
import { apiCall } from '../api';

jest.mock('../api', () => ({
  apiCall: jest.fn(),
  handleError: jest.fn(),
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

test('refreshToken', async () => {
  const setUserData = jest.fn();
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiYyIsImV4cGlyZXNBdCI6MTcyMTczNjU0NTE3MywiaWF0IjoxNzIxNzMyOTQ1LCJleHAiOjE3MjE3MzY1NDV9.7LTugX8TbME__17Rz9-kNZPohih9vIVGkBcuOXOmPIk';
  const response = {
    message: 'Token refreshed.',
    accessToken: {
      token: token,
      expiresAt: 1721736545173,
      payload: {
        userId: 4,
        username: 'c',
      },
    },
  };

  (apiCall as jest.Mock).mockResolvedValue(response);

  const responseData = await refreshToken(setUserData);

  expect(responseData).toEqual(response.accessToken);
  expect(apiCall).toHaveBeenCalledTimes(1);
  expect(setUserData).toHaveBeenCalledWith(response.accessToken);
  expect(localStorage.setItem).toHaveBeenCalledWith('token', JSON.stringify(response.accessToken));
});
