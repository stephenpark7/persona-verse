// @vitest-environment jsdom
import { expect, test } from 'vitest';
// import { renderHook } from '@testing-library/react';
// import { getDisplayName } from '../../pages/Home/Home';
// import { useJwt } from '../../redux';
import { BrowserRouter } from 'react-router-dom';


import { Provider } from 'react-redux';

import { store } from '../../redux/stores';
import { useJwt } from '../../redux/selectors/userSelectors';
import { render, renderHook } from '@testing-library/react';
import { Home } from '../../pages';

interface ReduxProviderProps {
  children: React.ReactNode;
  reduxStore: typeof store;
}

const ReduxProvider = ({ children, reduxStore }: ReduxProviderProps): JSX.Element => (
  <Provider store={reduxStore}>{children}</Provider>
);

test('...', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ReduxProvider reduxStore={store}>
        {children}
      </ReduxProvider>
    );
  };

  const Wrapper = renderHook(() => {
    useJwt();
  }, { wrapper });

  render(<BrowserRouter>
    wrapper(<Home />)
  </BrowserRouter>);
});

// test('getDisplayNames returns the correct display names', () => {
//   const jwt = {
//     token: 'token',
//     expiresAt: 1234567890,
//     payload: {
//       userId: 1,
//       username: 'testuser',
//       expiresAt: 1234567890,
//       jti: 'jti',
//     },
//   };

//   expect(getDisplayName(jwt)).toBe('testuser');

//   const { result } = renderHook(() => useJwt());

//   expect(result.current).toBe(null);
// });
