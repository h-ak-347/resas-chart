import axios from 'axios';

import type { ChartData } from '../../types/chart-data';

export const addData = async (prefCode: number, prefName: string, previousChartData?: ChartData): Promise<ChartData> => {
  class CustomError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'CustomError';
    }
  }

  const checkWhetherSameYears = (previousDataYears: number[], newDataYears: number[]) => {
    const mergedArray = [...previousDataYears, ...newDataYears];
    const uniqueArray = mergedArray.filter((item, _index, self) => self.indexOf(item) === self.lastIndexOf(item));
    const hasUniqYear = uniqueArray.length > 0;

    if (hasUniqYear) {
      throw new CustomError('Previous chart data and new data have different years.');
    }
  };

  try {
    const { data } = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
      headers: { 'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY },
    });

    const newData: { year: number; value: number }[] = data.result.data[0].data;

    // 前回取得したデータと追加されたデータの年が一致しない場合は例外とする
    if (previousChartData)
      checkWhetherSameYears(
        previousChartData?.map((v) => v.year),
        newData.map((v) => v.year),
      );

    // newDataを年ごとにpickして既存データに追加
    // previousChartDataが存在しない場合、新規に取得したデータをそのまま返す
    const updatedChartData: ChartData = previousChartData
      ? previousChartData.map((pItem) => {
          // checkWhetherSameYearsでcheckしているので、newItemがundefinedになることはないはず。lintに怒られるので書いているだけ
          const newItem = newData.find((nItem) => nItem.year === pItem.year);
          return newItem ? { ...pItem, [prefName]: newItem.value } : pItem;
        })
      : newData.map((item) => ({ year: item.year, [prefName]: item.value }));

    return updatedChartData;
  } catch (error) {
    if (error instanceof CustomError) {
      throw new Error('Unexpected data received. Please reload the page.');
    } else {
      throw new Error('Failed to fetch data from the API.');
    }
  }
};
