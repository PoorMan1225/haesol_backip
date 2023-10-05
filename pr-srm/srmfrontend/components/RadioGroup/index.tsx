import React, { useCallback, VFC } from 'react';
import { RadioFieldSet } from '@components/RadioGroup/styles';
import { IRadioValue } from '@typings/RadioValues';

interface Props {
  groupTitle: string;
  radioValues: IRadioValue[];
  onRadioChange: (value: string) => void;
}

const RadioGroup: VFC<Props> = ({ groupTitle, radioValues, onRadioChange }) => {
  const onChangeRadioValue = useCallback((ev: any) => {
    onRadioChange(ev.target.value);
  }, []);

  return (
    <>
      <RadioFieldSet onChange={onChangeRadioValue}>
        <span>{groupTitle}</span>
        {radioValues.map((radio) => {
          return (
            <label>
              <input
                type="radio"
                name="contact"
                value={radio.radioValue}
                checked={radio.checked}
                // disabled={!radio.enable}
              />
              <span>{radio.radioTitle}</span>
            </label>
          );
        })}
      </RadioFieldSet>
    </>
  );
};

export default RadioGroup;
