import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ICellEditor } from 'ag-grid-community';
import { INumberCellPrams } from '@typings/Props';
import { NumberEditorInput } from '@components/Grid/CellEditor/NumberEditor/styles';

const KEY_BACKSPACE = 'Backspace';
const KEY_F2 = 'F2';
const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_ARROW_LEFT = 'ArrowLeft';
const KEY_ARROW_RIGHT = 'ArrowRight';

export default memo(
  forwardRef<ICellEditor, INumberCellPrams>((props, ref) => {
    const createInitialState = () => {
      let startValue;
      let highlightAllOnFocus = true;
      const eventKey = props.eventKey;

      if (eventKey === KEY_BACKSPACE) {
        // 뒤로가기 버튼 눌렀을시에 글 삭제
        startValue = '';
      } else if (eventKey && eventKey.length === 1) {
        // 글자 눌렀을시에 editing
        startValue = eventKey;
        highlightAllOnFocus = false;
      } else {
        // 다른경우 현재 값
        startValue = props.value;
        if (eventKey === KEY_F2) {
          highlightAllOnFocus = false;
        }
      }

      return {
        value: startValue,
        highlightAllOnFocus,
      };
    };

    const initialState = createInitialState();
    const [value, setValue] = useState(initialState.value);
    const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(initialState.highlightAllOnFocus);
    const refInput = useRef<any>(null);

    // focus on the input
    useEffect(() => {
      // get ref from React component
      const eInput = refInput.current;
      if (!eInput) return;

      eInput.focus();
      if (highlightAllOnFocus) {
        eInput.select();
        setHighlightAllOnFocus(false);
      } else {
        // when we started editing, we want the caret at the end, not the start.
        // this comes into play in two scenarios:
        //   a) when user hits F2
        //   b) when user hits a printable character
        const length = eInput.value ? eInput.value.length : 0;
        if (length > 0) {
          eInput.setSelectionRange(length, length);
        }
      }
    }, []);

    /* Utility Methods */
    const isCharacter = props.eventKey ? props.eventKey.length === 1 : false;
    const cancelBeforeStart = isCharacter ? '1234567890'.indexOf(props.eventKey!!) < 0 : false;

    const isLeftOrRight = (event: any) => {
      return [KEY_ARROW_LEFT, KEY_ARROW_RIGHT].indexOf(event.key) > -1;
    };

    const isCharNumeric = (charStr: string) => {
      return !!/\d/.test(charStr) || charStr == '.';
    };

    const isNumericKey = (event: any) => {
      const charStr = event.key;
      return isCharNumeric(charStr);
    };

    const isBackspace = (event: any) => {
      return event.key === KEY_BACKSPACE;
    };

    const finishedEditingPressed = (event: any) => {
      const key = event.key;
      return key === KEY_ENTER || key === KEY_TAB;
    };

    const onKeyDown = (event: any) => {
      if (isLeftOrRight(event) || isBackspace(event)) {
        event.stopPropagation();
        return;
      }

      if (!finishedEditingPressed(event) && !isNumericKey(event)) {
        if (event.preventDefault) event.preventDefault();
      }

      if (finishedEditingPressed(event)) {
        props.stopEditing();
      }
    };

    const isValidValue = (value: any) => {
      const _value = value.toString().replaceAll('.', '');
      return _value === '' || _value == null;
    };

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          return isValidValue(value) ? 0 : parseFloat(value);
        },

        // Gets called once before editing starts, to give editor a chance to
        // cancel the editing before it even starts.
        isCancelBeforeStart() {
          return cancelBeforeStart;
        },

        // Gets called once when editing is finished (eg if Enter is pressed).
        // If you return true, then the result of the edit will be ignored.
        isCancelAfterEnd() {
          // will reject the number if it greater than 1,000,000
          // not very practical, but demonstrates the method.
          const finalValue = this.getValue() as any;
          return finalValue && finalValue > 1000000000;
        },
      };
    });

    return (
      <NumberEditorInput
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => onKeyDown(event)}
        className="numeric-input"
      />
    );
  }),
);
