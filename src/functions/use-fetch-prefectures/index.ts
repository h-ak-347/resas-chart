import { useAtom } from 'jotai';
import { useCallback } from 'react';

import globalPrefectures from '../../jotai/global-prefectures';
import axiosInstance from '../../utils/axios-instance';
import { useIsLoading } from '../use-is-loading';

export const useFetchPrefectures = () => {
  const [prefectures, setPrefectures] = useAtom(globalPrefectures);
  const { addLoadingItem, removeLoadingItem } = useIsLoading();

  const fetchPrefectures = useCallback(async () => {
    try {
      addLoadingItem('prefectures');
      const { data } = await axiosInstance.get('/prefectures');
      setPrefectures(data.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      removeLoadingItem('prefectures');
    }
  }, [addLoadingItem, removeLoadingItem, setPrefectures]);

  return { prefectures, fetchPrefectures };
};
