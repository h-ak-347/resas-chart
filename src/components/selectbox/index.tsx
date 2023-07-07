import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';

import { useSelectedPrefectures } from '../../functions/use-selected-prefectures';
import s from './index.module.scss';

type SelectBoxProps = {
  selectedPrefectures: { prefCode: number; prefName: string }[];
  prefectures: { prefCode: number; prefName: string }[];
};

const SelectBox = ({ selectedPrefectures, prefectures }: SelectBoxProps) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const { addSelectedPrefectures, removeSelectedPrefectures } = useSelectedPrefectures();

  //TODO: データ更新の発火はここに書いてあっていいのか、Reviewがほしい
  const clickHandler = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked) {
        addSelectedPrefectures(Number(event.currentTarget.value), event.currentTarget.name);
      } else {
        removeSelectedPrefectures(Number(event.currentTarget.value));
      }
    },
    [addSelectedPrefectures, removeSelectedPrefectures],
  );

  return (
    <div className={s['selectBox']}>
      <button type="button" className={s['selectBox__toggleButton']} onClick={() => setIsModalShow(true)}>
        <span className={s['selectBox__selected']}>
          {selectedPrefectures.map((item, index) => (index === 0 ? item.prefName : `, ${item.prefName}`))}
        </span>
      </button>
      <div className={s['selectBox__modal']} data-is-show={isModalShow} role="dialog">
        <div className={s['selectBox__modalInner']}>
          <ul className={s['selectBox__list']}>
            {prefectures.map((item, index) => (
              <li className={s['selectBox__item']} key={index}>
                <label htmlFor={`prefCheckbox${item.prefCode}`}>
                  <input
                    type="checkbox"
                    name={item.prefName}
                    value={item.prefCode}
                    id={`prefCheckbox${item.prefCode}`}
                    onClick={clickHandler}
                    defaultChecked={selectedPrefectures.some((defaultItem) => defaultItem.prefCode === item.prefCode)}
                    className={s['selectBox__input']}
                  />
                  <span className={s['selectBox__labelText']}>{item.prefName}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button aria-label="close" className={s['selectBox__closeButton']} onClick={() => setIsModalShow(false)}></button>
      </div>
    </div>
  );
};

export default SelectBox;
