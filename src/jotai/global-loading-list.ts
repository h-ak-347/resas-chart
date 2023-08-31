import { atom } from 'jotai';

const globalLoadingList = atom<string[]>([]);

export default globalLoadingList;
