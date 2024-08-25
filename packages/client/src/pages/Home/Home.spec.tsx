import { expect, describe, it } from 'vitest';
import { renderApp } from '../../tests/utils';

describe('Home page', () => {
  beforeEach(() => {
    renderApp();
  });

  it('has a title', () => {
    expect(document.title).toBe('PersonaVerse');
  });

  // it('
});
