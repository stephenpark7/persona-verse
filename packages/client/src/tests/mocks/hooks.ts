import { vi } from 'vitest';
import { useUserState } from '@hooks';
import { UserType, useUserStateFactory } from '@factories';

// TODO:
// Should only be used in unit tests
// so we should use renderApp instead of renderPage
// to wrap the component in a Router with providers
// and preloaded state (need to figure out tweetsAPI default state)
// also remove import from ./index.ts
// and directly import this file wherever needed
// in the unit spec files only
// we should give preloaded state a default value for useUserState
// and pass it to renderApp

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
}));

export const useUserStateStub = (type: UserType) =>
  vi.mocked(useUserState).mockImplementation(useUserStateFactory(type));
