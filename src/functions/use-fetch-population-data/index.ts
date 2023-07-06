import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

import globalChartData from '../../jotai/global-chart-data';
import globalIsLoading from '../../jotai/global-is-loading';
import globalSelectedPrefectures from '../../jotai/global-selected-prefectures';
import type { Prefectures } from '../../types/prefectures';
import type { ResasApiData } from '../../types/resas-api-data';
import axiosInstance from '../../utils/axios-instance';
import { mergeData } from '../merge-data';

export const useFetchPopulationData = () => {
  const setIsLoading = useSetAtom(globalIsLoading);
  const setChartData = useSetAtom(globalChartData);
  const selectedPrefectures = useAtomValue(globalSelectedPrefectures);
  const previousChartData = useAtomValue(globalChartData);

  const fetchPopulationData = useCallback(async (prefecture: Prefectures[number]) => {
    let fetchedData: { prefName: string; populationData: ResasApiData };

    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/population/composition/perYear?prefCode=${prefecture.prefCode}`);
      const additionalData: ResasApiData = data.result.data[0].data;
      fetchedData = { prefName: prefecture.prefName, populationData: additionalData };
      return fetchedData;
    } catch (error) {
      return new Error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNAddPopulationData = useCallback((prefectures: Prefectures) => {
    let chartData = previousChartData;
    prefectures.forEach(async (prefecture, index) => {
      const result: { prefName: string; populationData: ResasApiData } | Error = await fetchPopulationData(prefecture);
      if (result instanceof Error) {
        console.error(result.message);
      } else {
        chartData = mergeData(result.prefName, result.populationData, chartData || undefined);
      }

      if (index === prefectures.length - 1) {
        setChartData(chartData);
      }
    });
  }, []);

  useEffect(() => {
    fetchNAddPopulationData(selectedPrefectures);
  }, [fetchNAddPopulationData, selectedPrefectures]); // TODO: readOnlyなデフォルト値を作成し、selectedPrefecturesの書き換え時に走らないようにしたい。fetchNAddPopulationDataのupdateも明示的に行う方が良い

  return;
};
