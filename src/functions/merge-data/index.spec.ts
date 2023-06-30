import { mergeData } from './index';

test('merge additionalData and previousChartData to correct data', () => {
  expect(
    mergeData(
      '北海道',
      [
        { year: 1960, value: 5000 },
        { year: 1965, value: 5000 },
      ],
      [
        { year: 1960, 東京都: 100000 },
        { year: 1965, 東京都: 120000 },
      ],
    ),
  ).toStrictEqual([
    { year: 1960, 東京都: 100000, 北海道: 5000 },
    { year: 1965, 東京都: 120000, 北海道: 5000 },
  ]);
});

test('If previousData is undefined, formatted additional data.', () => {
  expect(
    mergeData('北海道', [
      { year: 1960, value: 5000 },
      { year: 1965, value: 5000 },
    ]),
  ).toStrictEqual([
    { year: 1960, 北海道: 5000 },
    { year: 1965, 北海道: 5000 },
  ]);
});

test('If data for any year is missing, return an empty array', () => {
  expect(
    mergeData(
      '北海道',
      [{ year: 1960, value: 5000 }],
      [
        { year: 1960, 東京都: 100000 },
        { year: 1965, 東京都: 120000 },
      ],
    ),
  ).toStrictEqual([]);
});
