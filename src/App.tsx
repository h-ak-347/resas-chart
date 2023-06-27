import { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import 'normalize.css';
import './App.scss';
import SelectBox from './components/selectbox';
import Chart from './components/chart';

const App = () => {
  type ChartData = { [key: string]: number | string }[]; //TODO: もう少し厳密に定義したい

  const defaultPrefectures = [
    { prefCode: 13, prefName: '東京都' },
    { prefCode: 27, prefName: '大阪府' },
  ];
  const [selectedPrefectures, setSelectedPrefectures] = useState([...defaultPrefectures]);
  const [prefectures, setPrefectures] = useState<{ prefCode: number; prefName: string }[]>();
  const [chartData, setChartData] = useState<ChartData>();

  const addData = (prefCode: number, prefName: string) => {
    axios
      // ↓開発用ダミーデータ参照↓
      // .get(`./dummyPopulationData${prefCode}.json`)
      .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
        headers: { 'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY },
      })
      .then((results) => {
        const newData: { year: number; value: number }[] = results.data.result.data[0].data;

        setChartData((previousData) => {
          // 追加するデータを年ごとにpickして既存データに追加
          const updatedData: ChartData = [];
          if (previousData) {
            previousData.forEach((item) => {
              const newItem = newData.find((nItem) => nItem.year === item.year);
              if (newItem) {
                updatedData.push({ ...item, [prefName]: newItem.value });
              } else {
                // 対象年のデータがなければ既存データのまま追加
                // FIXME: 抜けている年があると、チャートが正しく表示されなくなる。が、間違ったデータを表示するのも問題なので一旦考慮外とした
                updatedData.push(item);
              }
            });
            // TODO: 新しいデータにのみ存在する年があれば追加する？1セッション内でデータが更新されれば発生するが発生頻度はかなり低そう
          } else {
            newData.forEach((item) => {
              updatedData.push({ year: item.year, [prefName]: item.value });
            });
          }
          return updatedData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateSelectedPrefectures = (prefCode: number, prefName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPrefectures((previousValue) => [...previousValue, { prefCode: prefCode, prefName: prefName }]);
    } else {
      setSelectedPrefectures((previousValue) => [
        ...selectedPrefectures.filter((prefecture) => {
          return prefecture.prefCode !== prefCode;
        }),
      ]);
    }
  };

  const clickHandler = (event: MouseEvent<HTMLInputElement>) => {
    updateSelectedPrefectures(Number(event.currentTarget.value), event.currentTarget.name, event.currentTarget.checked);
    if (event.currentTarget.checked) addData(Number(event.currentTarget.value), event.currentTarget.name);
  };

  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY },
      })
      .then((results) => {
        const result = results.data.result;
        setPrefectures(result);
      })
      .catch((error) => {
        console.error(error);
      });
    // ↓開発用ダミーデータ参照↓
    // axios
    //   .get('./dummyPrefectures.json')
    //   .then((results) => {
    //     const result = results.data;
    //     setPrefectures(result);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    defaultPrefectures.forEach((prefecture) => addData(prefecture.prefCode, prefecture.prefName));
  }, []);

  return (
    <>
      <h1>都道府県別の人口推移</h1>
      {prefectures && <SelectBox selectedPrefectures={selectedPrefectures} prefectures={prefectures} clickHandler={clickHandler} />}
      <div className="chartArea">{chartData && <Chart selectedPrefectures={selectedPrefectures} chartData={chartData} />}</div>
    </>
  );
};

export default App;
