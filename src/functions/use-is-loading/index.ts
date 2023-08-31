import { useAtom } from 'jotai';
import { useCallback } from 'react';

import globalLoadingList from '../../jotai/global-loading-list';

export const useIsLoading = () => {
  const [loadingList, setLoadingList] = useAtom(globalLoadingList);

  const isLoading = loadingList.length > 0;

  const removeLoadingItem = useCallback(
    (itemName: string) => {
      setLoadingList((a) => a.filter((item) => item !== itemName));
    },
    [setLoadingList],
  );

  const addLoadingItem = useCallback(
    (itemName: string) => {
      setLoadingList((a) => (a.includes(itemName) ? a : [...a, itemName]));
    },
    [setLoadingList],
  );

  return { isLoading, addLoadingItem, removeLoadingItem };
};
