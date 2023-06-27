global.ResizeObserver = require('resize-observer-polyfill');
import '@testing-library/jest-dom';
import Chart from './index.tsx';
import { render } from '@testing-library/react';

const mockDefaultProps: React.ComponentProps<typeof Chart> = {
  selectedPrefectures: [{ prefCode: 1, prefName: '北海道' }],
  chartData: [
    { year: 1960, 北海道: 1000 },
    { year: 1965, 北海道: 2000 },
    { year: 1970, 北海道: 1500 },
  ],
};

describe('Chart', () => {
  it('should match to snapshot.', async () => {
    const { asFragment } = render(<Chart {...mockDefaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
