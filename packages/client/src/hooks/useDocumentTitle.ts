// TODO: lets use redux to store the title and update it from there

import { useLayoutEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
};
