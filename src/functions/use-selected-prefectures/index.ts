import { useAtom } from 'jotai';
import { useCallback } from 'react';

import globalSelectedPrefectures from '../../jotai/global-selected-prefectures';

export const useSelectedPrefectures = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useAtom(globalSelectedPrefectures);

  const addSelectedPrefectures = useCallback(
    (prefCode: number, prefName: string) => {
      setSelectedPrefectures([...selectedPrefectures, { prefCode: prefCode, prefName: prefName }]);
    },
    [selectedPrefectures, setSelectedPrefectures],
  );

  const removeSelectedPrefectures = useCallback(
    (prefCode: number) => {
      setSelectedPrefectures(
        selectedPrefectures.filter((prefecture) => {
          return prefecture.prefCode !== prefCode;
        }),
      );
    },
    [selectedPrefectures, setSelectedPrefectures],
  );

  return { setSelectedPrefectures, addSelectedPrefectures, removeSelectedPrefectures };
};
