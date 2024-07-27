import { refreshToken } from '../../api/refresh.api';

jest.mock('../../api/refresh', () => ({
  refreshToken: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn(function(key: string): string | null {
      return store[key] || null;
    }),
    setItem: jest.fn(function(key: string, value: string): void {
      store[key] = value.toString();
    }),
    clear: jest.fn(function(): void {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const response = { accessToken: 'mockAccessToken' }; 
const setUserData = jest.fn();

test('refreshToken', async () => {
  (refreshToken as jest.Mock).mockResolvedValue(response);
  await (refreshToken as jest.Mock)(setUserData);
  expect(refreshToken).toHaveBeenCalledTimes(1);
  expect(localStorageMock.setItem).toHaveBeenCalledWith('token', JSON.stringify(response));
  // expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
  // expect(localStorageMock.getItem.mock.results[0].value).toEqual(JSON.stringify(response));
});
