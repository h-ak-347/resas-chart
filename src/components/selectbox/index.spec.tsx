import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SelectBox from './index';

const mockDefaultProps: React.ComponentProps<typeof SelectBox> = {
  selectedPrefectures: [{ prefCode: 1, prefName: '北海道' }],
  prefectures: [
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
  ],
  clickHandler: jest.fn(),
};

describe('SelectBox', () => {
  it('should match to snapshot.', async () => {
    const { asFragment } = render(<SelectBox {...mockDefaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display modal window when click the select-box.', async () => {
    render(<SelectBox {...mockDefaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: '北海道' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-is-show', 'true');
    console.log(screen.getByRole('button', { name: '北海道' }));
  });

  it('should hide modal window when click the close-button.', async () => {
    render(<SelectBox {...mockDefaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: '北海道' }));
    await userEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-is-show', 'false');
  });
});
