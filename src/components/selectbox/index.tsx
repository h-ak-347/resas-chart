import { MouseEvent, useState } from 'react';

import s from './index.module.scss';

type SelectBoxProps = {
  selectedPrefectures: { prefCode: number; prefName: string }[];
  prefectures: { prefCode: number; prefName: string }[];
  clickHandler?: (event: MouseEvent<HTMLInputElement>) => void;
};

const SelectBox = ({ selectedPrefectures, prefectures, clickHandler }: SelectBoxProps) => {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
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
