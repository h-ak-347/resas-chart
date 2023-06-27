import { MouseEvent } from 'react';

type SelectBoxProps = {
  selectedPrefectures: { prefCode: number; prefName: string }[];
  prefectures: { prefCode: number; prefName: string }[];
  clickHandler?: (event: MouseEvent<HTMLInputElement>) => void;
};

const SelectBox = ({ selectedPrefectures, prefectures, clickHandler }: SelectBoxProps) => {
  return (
    <div>
      <div>{selectedPrefectures.map((item) => item.prefName)}</div>
      <ul>
        {prefectures.map((item, index) => (
          <li key={index}>
            <label htmlFor={`prefCheckbox${item.prefCode}`}>
              <input
                type="checkbox"
                name={item.prefName}
                value={item.prefCode}
                id={`prefCheckbox${item.prefCode}`}
                onClick={clickHandler}
                defaultChecked={selectedPrefectures.some((defaultItem) => defaultItem.prefCode === item.prefCode)}
              />
              {item.prefName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectBox;
