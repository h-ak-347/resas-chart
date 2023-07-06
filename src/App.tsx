import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';

import Chart from './components/chart';
import SelectBox from './components/selectbox';
import { useFetchPopulationData } from './functions/use-fetch-population-data/index.ts';
import { useFetchPrefectures } from './functions/use-fetch-prefectures/index.ts';
import { useSelectedPrefectures } from './functions/use-selected-prefectures/index.ts';
import globalChartData from './jotai/global-chart-data.ts';
import globalIsLoading from './jotai/global-is-loading.ts';
import globalPrefectures from './jotai/global-prefectures.ts';
import globalSelectedPrefectures from './jotai/global-selected-prefectures.ts';

const App = () => {
  const isLoading = useAtomValue(globalIsLoading);
  const prefectures = useAtomValue(globalPrefectures);
  const selectedPrefectures = useAtomValue(globalSelectedPrefectures);
  const chartData = useAtomValue(globalChartData);

  const { addSelectedPrefectures, removeSelectedPrefectures } = useSelectedPrefectures();

  useFetchPrefectures();
  useFetchPopulationData();

  const clickHandler = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked) {
        addSelectedPrefectures(Number(event.currentTarget.value), event.currentTarget.name);
      } else {
        removeSelectedPrefectures(Number(event.currentTarget.value));
      }
    },
    [addSelectedPrefectures, removeSelectedPrefectures],
  );

  return (
    <ChakraProvider>
      <Box minHeight={'100dvh'}>
        {isLoading && (
          <Box position={'fixed'} top={'0'}>
            Loading...
          </Box>
        )}
        <Box my={20}>
          <Heading as={'h1'} textAlign={'center'} mb={10}>
            都道府県別の人口推移
          </Heading>
          {prefectures && <SelectBox selectedPrefectures={selectedPrefectures} prefectures={prefectures} clickHandler={clickHandler} />}
          <Box mt={20}>{chartData && <Chart selectedPrefectures={selectedPrefectures} chartData={chartData} />}</Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
