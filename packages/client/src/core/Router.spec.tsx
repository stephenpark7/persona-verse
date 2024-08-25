import { expect, describe, it } from 'vitest';
import { router } from './Router';
import { renderApp } from '../tests/utils';


describe('Router', () => {
  it('renders', () => {
    renderApp();
    console.log(router.state.matches);
    // expect(document.title).toBe('PersonaVerse');
  });
});
