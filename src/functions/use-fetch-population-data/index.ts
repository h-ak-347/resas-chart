import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

import globalChartData from '../../jotai/global-chart-data';
import globalIsLoading from '../../jotai/global-is-loading';
import globalSelectedPrefectures from '../../jotai/global-selected-prefectures';
import type { ResasApiData } from '../../types/resas-api-data';
import axiosInstance from '../../utils/axios-instance';
import { mergeData } from '../merge-data';

export const useFetchPopulationData = () => {
  const setIsLoading = useSetAtom(globalIsLoading);
  const setChartData = useSetAtom(globalChartData);
  const selectedPrefectures = useAtomValue(globalSelectedPrefectures);
  const previousChartData = useAtomValue(globalChartData);

  const fetchNAddPopulationData = useCallback(
    async (prefCode: number, prefName: string) => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(`/population/composition/perYear?prefCode=${prefCode}`);
        const additionalData: ResasApiData = data.result.data[0].data;
        setChartData(mergeData(prefName, additionalData, previousChartData || undefined));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [previousChartData],
  );

  useEffect(() => {
    selectedPrefectures.forEach((prefecture) => {
      fetchNAddPopulationData(prefecture.prefCode, prefecture.prefName);
    });
  }, []);

  return { fetchNAddPopulationData };
};
