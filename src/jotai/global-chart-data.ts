import { atom } from 'jotai';

import type { ChartData } from '../types/chart-data';

const globalChartData = atom<ChartData | null>(null);

export default globalChartData;
