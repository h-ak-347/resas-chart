import { useAtom } from 'jotai';
import { useCallback } from 'react';

import globalPrefectures from '../../jotai/global-prefectures';
import axiosInstance from '../../utils/axios-instance';

export const useFetchPrefectures = () => {
  const [prefectures, setPrefectures] = useAtom(globalPrefectures);

  const fetchPrefectures = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/prefectures');
      setPrefectures(data.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [setPrefectures]);

  return { prefectures, fetchPrefectures };
};
