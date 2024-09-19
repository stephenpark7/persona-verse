// TODO: lets use redux to store the title and update it from there

import { useLayoutEffect } from 'react';
import { store } from '@redux';
import { setDocTitle } from '@redux';

export const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    store.dispatch(setDocTitle(title));
    document.title = title;
  }, [title]);
};
