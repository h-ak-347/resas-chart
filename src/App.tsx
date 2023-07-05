import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import type { MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Chart from './components/chart';
import SelectBox from './components/selectbox';
import { mergeData } from './functions/merge-data/index.ts';
import type { ChartData } from './types/chart-data';
import type { ResasApiData } from './types/resas-api-data.ts';
import axiosInstance from './utils/axios-instance.ts';

const App = () => {
  const defaultPrefectures = useMemo(
    () => [
      { prefCode: 13, prefName: '東京都' },
      { prefCode: 27, prefName: '大阪府' },
    ],
    [],
  );

  const [selectedPrefectures, setSelectedPrefectures] = useState([...defaultPrefectures]);
  const [prefectures, setPrefectures] = useState<{ prefCode: number; prefName: string }[]>();
  const [chartData, setChartData] = useState<ChartData>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrefectureList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get('/prefectures');
      setPrefectures(data.result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPopulationData = useCallback(async (prefCode: number, prefName: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/population/composition/perYear?prefCode=${prefCode}`);
      const additionalData: ResasApiData = data.result.data[0].data;
      setChartData((previousData) => mergeData(prefName, additionalData, previousData));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSelectedPrefectures = useCallback(
    (prefCode: number, prefName: string, isChecked: boolean) => {
      if (isChecked) {
        setSelectedPrefectures((previousValue) => [...previousValue, { prefCode: prefCode, prefName: prefName }]);
      } else {
        setSelectedPrefectures(() => [
          ...selectedPrefectures.filter((prefecture) => {
            return prefecture.prefCode !== prefCode;
          }),
        ]);
      }
    },
    [selectedPrefectures],
  );

  const clickHandler = useCallback(
    async (event: MouseEvent<HTMLInputElement>) => {
      updateSelectedPrefectures(Number(event.currentTarget.value), event.currentTarget.name, event.currentTarget.checked);
      if (event.currentTarget.checked) {
        fetchPopulationData(Number(event.currentTarget.value), event.currentTarget.name);
      }
    },
    [fetchPopulationData, updateSelectedPrefectures],
  );

  useEffect(() => {
    fetchPrefectureList();

    defaultPrefectures.forEach((prefecture) => {
      fetchPopulationData(prefecture.prefCode, prefecture.prefName);
    });
  }, [defaultPrefectures, fetchPopulationData, fetchPrefectureList]);

  return (
    <div>
      <ChakraProvider>
        <Box my={20}>
          <Heading as={'h1'} textAlign={'center'} mb={10}>
            都道府県別の人口推移
          </Heading>
          {prefectures && <SelectBox selectedPrefectures={selectedPrefectures} prefectures={prefectures} clickHandler={clickHandler} />}

          <Box mt={20}>
            {isLoading && (
              <Box position={'fixed'} top={'0'}>
                Loading...
              </Box>
            )}
            {chartData && <Chart selectedPrefectures={selectedPrefectures} chartData={chartData} />}
          </Box>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default App;
