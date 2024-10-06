import { useLayoutEffect } from 'react';
import { store, setDocTitle } from '@redux';

export const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    store.dispatch(setDocTitle(title));
    document.title = title;
  }, [title]);
};
