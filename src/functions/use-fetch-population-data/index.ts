import { useAtom } from 'jotai';
import { useCallback } from 'react';

import globalChartData from '../../jotai/global-chart-data';
import type { ChartData } from '../../types/chart-data';
import type { Prefectures } from '../../types/prefectures';
import type { ResasApiData } from '../../types/resas-api-data';
import axiosInstance from '../../utils/axios-instance';
import { mergeData } from '../merge-data';

export const useFetchPopulationData = () => {
  const [chartData, setChartData] = useAtom(globalChartData);

  const fetchPopulationData = useCallback(async (prefecture: Prefectures[number]) => {
    let fetchedData: { prefName: string; populationData: ResasApiData };

    try {
      const { data } = await axiosInstance.get(`/population/composition/perYear?prefCode=${prefecture.prefCode}`);
      const additionalData: ResasApiData = data.result.data[0].data;
      fetchedData = { prefName: prefecture.prefName, populationData: additionalData };
      return fetchedData;
    } catch (error) {
      return new Error('Failed to fetch data');
    }
  }, []);

  const fetchNAddPopulationData = useCallback(
    (prefectures: Prefectures) => {
      let updateData: ChartData | null = null;
      prefectures.forEach(async (prefecture, index) => {
        const result: { prefName: string; populationData: ResasApiData } | Error = await fetchPopulationData(prefecture);

        if (result instanceof Error) {
          console.error(result.message);
        } else {
          updateData = mergeData(result.prefName, result.populationData, updateData || undefined);
        }

        if (index === prefectures.length - 1) {
          setChartData(updateData);
          console.log(updateData);
        }
      });
    },
    [fetchPopulationData, setChartData],
  );

  return { chartData, fetchNAddPopulationData };
};
