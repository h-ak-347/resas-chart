import { atom } from 'jotai';

import type { Prefectures } from '../types/prefectures';

const globalSelectedPrefectures = atom<Prefectures>([
  { prefCode: 13, prefName: '東京都' },
  { prefCode: 27, prefName: '大阪府' },
]);

export default globalSelectedPrefectures;
