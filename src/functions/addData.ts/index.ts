// import axios from 'axios';

// export const addData = (prefCode: number, prefName: string) => {
//   axios
//     // ↓開発用ダミーデータ参照↓
//     // .get(`./dummyPopulationData${prefCode}.json`)
//     .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
//       headers: { 'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY },
//     })
//     .then((results) => {
//       console.log(results.data.result.data[0].data);

//       const newData: { year: number; value: number }[] = results.data.result.data[0].data;

//       setChartData((previousData) => {
//         // 追加するデータを年ごとにpickして既存データに追加
//         const updatedData: ChartData = [];
//         if (previousData) {
//           previousData.forEach((item) => {
//             const newItem = newData.find((nItem) => nItem.year === item.year);
//             if (newItem) {
//               updatedData.push({ ...item, [prefName]: newItem.value });
//             } else {
//               // 対象年のデータがなければ既存データのまま追加
//               // FIXME: 抜けている年があると、チャートが正しく表示されなくなる。が、間違ったデータを表示するのも問題なので一旦考慮外とした
//               updatedData.push(item);
//             }
//           });
//           // TODO: 新しいデータにのみ存在する年があれば追加する？1セッション内でデータが更新されれば発生するが発生頻度はかなり低そう
//         } else {
//           newData.forEach((item) => {
//             updatedData.push({ year: item.year, [prefName]: item.value });
//           });
//         }
//         return updatedData;
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
