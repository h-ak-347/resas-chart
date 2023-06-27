import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import s from './index.module.scss';

type ChartProps = {
  selectedPrefectures: { prefCode: number; prefName: string }[];
  chartData: { [key: string]: number | string }[];
};

const Chart = ({ selectedPrefectures, chartData }: ChartProps) => {
  return (
    <div className={s['chart']}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{
              value: '年',
              offset: -15,
              position: 'insideBottomRight',
            }}
          />
          <YAxis
            label={{ value: '人口数', offset: -10, angle: -90, position: 'insideLeft' }}
            tickFormatter={(tick) => {
              return new Intl.NumberFormat('ja-JP').format(tick);
            }}
          />
          <Tooltip formatter={(value) => `${new Intl.NumberFormat('ja-JP').format(Number(value))}人`} />
          {selectedPrefectures.length &&
            selectedPrefectures.map((prefecture, index) => <Line stroke="#12991c" key={index} dataKey={prefecture.prefName} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
