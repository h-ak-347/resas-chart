import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

import Chart from './components/chart';
import SelectBox from './components/selectbox';
import { useFetchPopulationData } from './functions/use-fetch-population-data/index.ts';
import { useFetchPrefectures } from './functions/use-fetch-prefectures/index.ts';
import { useIsLoading } from './functions/use-is-loading/index.ts';
import globalSelectedPrefectures from './jotai/global-selected-prefectures.ts';

const App = () => {
  const selectedPrefectures = useAtomValue(globalSelectedPrefectures);
  const { isLoading } = useIsLoading();
  const { prefectures, fetchPrefectures } = useFetchPrefectures();
  const { chartData, fetchNAddPopulationData } = useFetchPopulationData();

  useEffect(() => {
    fetchPrefectures();
    fetchNAddPopulationData(selectedPrefectures);
  }, [fetchNAddPopulationData, fetchPrefectures, selectedPrefectures]);

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
          {prefectures && <SelectBox selectedPrefectures={selectedPrefectures} prefectures={prefectures} />}
          <Box mt={20}>{chartData && <Chart selectedPrefectures={selectedPrefectures} chartData={chartData} />}</Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
