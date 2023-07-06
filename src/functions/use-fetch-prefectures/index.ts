import { useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

import globalIsLoading from '../../jotai/global-is-loading';
import globalPrefectures from '../../jotai/global-prefectures';
import axiosInstance from '../../utils/axios-instance';

export const useFetchPrefectures = () => {
  const setIsLoading = useSetAtom(globalIsLoading);
  const setPrefectures = useSetAtom(globalPrefectures);

  const fetchPrefectures = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get('/prefectures');
      setPrefectures(data.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setPrefectures]);

  useEffect(() => {
    fetchPrefectures();
  }, [fetchPrefectures]);

  return;
};
