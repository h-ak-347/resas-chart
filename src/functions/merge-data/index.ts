import type { ChartData } from '../../types/chart-data';
import type { ResasApiData } from '../../types/resas-api-data';

export const mergeData = (prefName: string, additionalData: ResasApiData, previousChartData?: ChartData): ChartData => {
  let updatedData: ChartData;

  const hasUniqYear = (previousDataYears: number[], newDataYears: number[]): boolean => {
    const mergedArray = [...previousDataYears, ...newDataYears];
    const uniqueArray = mergedArray.filter((item, _index, self) => self.indexOf(item) === self.lastIndexOf(item));
    return uniqueArray.length > 0;
  };

  if (previousChartData) {
    // 前回取得したデータと追加されたデータの年が一致しない場合はチャートを表示しない
    if (
      hasUniqYear(
        previousChartData?.map((v) => v.year),
        additionalData.map((v) => v.year),
      )
    ) {
      console.error('Previous chart data and additional data have different years.');
      updatedData = [];
    } else {
      // newDataを年ごとにpickして既存データに追加
      updatedData = previousChartData.map((pItem) => {
        // hasUniqYearがtrueの場合を弾いているので、newItemがundefinedになることはないはず。lintに怒られるので書いておく
        const newItem = additionalData.find((nItem) => nItem.year === pItem.year);
        return newItem ? { ...pItem, [prefName]: newItem.value } : pItem;
      });
    }
  } else {
    updatedData = additionalData.map((item) => ({ year: item.year, [prefName]: item.value }));
  }
  return updatedData;
};
