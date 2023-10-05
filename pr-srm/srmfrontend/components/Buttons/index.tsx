import React, { useCallback, VFC } from 'react';
import { Button } from '@pages/X/XM/XM_101W/styles';
import { ButtonsWrapper } from '@components/Buttons/styles';
import { IButtonProps } from '@typings/Buttons';

interface Props {
  buttonProps: IButtonProps[];
  menuButtonClick: (type: string) => void;
}

const Buttons: VFC<Props> = ({ buttonProps, menuButtonClick }) => {
  const onMenuButtonClick = (ev: any) => {
    menuButtonClick(ev.target.value);
  };

  return (
    <ButtonsWrapper>
      {buttonProps.map((buttonProp) => {
        return (
          <Button
            key={buttonProp.key}
            className={'condition-button'}
            buttonColor={buttonProp.buttonColor}
            value={buttonProp.key}
            buttonWidth={buttonProp.buttonWidth}
            onClick={onMenuButtonClick}
          >
            {buttonProp.buttonTitle}
          </Button>
        );
      })}
    </ButtonsWrapper>
  );
};

export default Buttons;
