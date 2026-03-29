import { useEffect } from 'react';

const DEFAULT_TITLE = 'AI Superman DJY';

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  }, [title]);
};
