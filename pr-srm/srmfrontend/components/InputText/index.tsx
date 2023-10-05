import React, { useRef, VFC } from 'react';
import { InputTextWrapper } from '@components/InputText/styles';
import { Button } from '@pages/X/XM/XM_101W/styles';
import { IInputProps } from '@typings/Input';

interface Props {
  inputId: string;
  inputTitle: string;
  inputValue: IInputProps;
  onOpenPopup: () => void;
  onInputChange: (ev: any) => void;
  inputRefs: React.MutableRefObject<{ [key: string]: React.MutableRefObject<HTMLInputElement | null> }>;
}

const InputText: VFC<Props> = ({ inputId, inputTitle, inputValue, onOpenPopup, onInputChange, inputRefs }) => {
  const inputCode = `${inputId}-code`;
  const inputText = `${inputId}-text`;
  inputRefs.current[inputCode] = useRef(null);
  inputRefs.current[inputText] = useRef(null);

  return (
    <>
      <span>{inputTitle}</span>
      <InputTextWrapper
        ref={inputRefs.current[inputCode]}
        type="text"
        size={35}
        placeholder="검색어를 입력하세요"
        title="검색어 입력"
        onChange={onInputChange}
        value={inputValue.code}
      />
      <Button className={'condition-button'} onClick={onOpenPopup}></Button>
      <InputTextWrapper
        style={{ marginLeft: '0px' }}
        readOnly={true}
        ref={inputRefs.current[inputText]}
        type="text"
        size={35}
        value={inputValue.text}
      />
    </>
  );
};

export default InputText;
