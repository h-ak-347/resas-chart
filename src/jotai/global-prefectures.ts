import { atom } from 'jotai';

import type { Prefectures } from '../types/prefectures';

const globalPrefectures = atom<Prefectures | null>(null);

export default globalPrefectures;
