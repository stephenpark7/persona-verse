import { renderHook } from '@testing-library/react';
import { store, setDocTitle } from '@redux';
import { useDocumentTitle } from './useDocumentTitle';
import { describe, it, expect, vi } from 'vitest';

vi.spyOn(store, 'dispatch');

const title = 'Test Title';

describe('useDocumentTitle', () => {
  it('should dispatch setDocTitle action with the correct title', () => {
    renderHook(() => useDocumentTitle(title));
    expect(store.dispatch).toHaveBeenCalledWith(setDocTitle(title));
  });

  it('should set document.title to the provided title', () => {
    renderHook(() => useDocumentTitle(title));
    expect(document.title).toBe(title);
  });
});
