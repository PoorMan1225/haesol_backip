import React, { useEffect, forwardRef, useState, useRef, useCallback, useImperativeHandle, memo } from 'react';
import { ICellEditor } from 'ag-grid-community';
import { DropDownCellEditorWrapper, DropDownCellItemsWrapper } from '@components/Grid/CellEditor/DropCellEditor/styles';
import { IDropCellParams, IDropCellProps } from '@typings/Props';
import DropCellItem from '@components/Grid/CellEditor/DropCellEditor/DropCellItem';

const DropCellEditor = memo(
  forwardRef<ICellEditor, IDropCellParams>((props, ref) => {
    const [ready, setReady] = useState(false);
    const [done, setDone] = useState(false);
    const refContainer = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(props.value);
    const initFocusIndex = props.values.findIndex((drop) => drop.CODE === props.value);
    const [focusIndex, setFocusIndex] = useState(initFocusIndex);

    useEffect(() => {
      if (focusIndex < 0) return;
      setValue(props.values[focusIndex].CODE);
    }, [focusIndex]);

    const checkUpAndDown = (event: any) => {
      if (ready) {
        if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
          if (props.values.length <= 0) return;
          // left and right
          if (event.key === 'ArrowUp') {
            if (focusIndex - 1 < 0) {
              setFocusIndex(props.values.length - 1);
            } else {
              setFocusIndex((prevIndex) => prevIndex - 1);
            }
          }

          if (event.key === 'ArrowDown') {
            if (focusIndex + 1 >= props.values.length) {
              setFocusIndex(0);
            } else {
              setFocusIndex((prevIndex) => prevIndex + 1);
            }
          }
          event.stopPropagation();
        }
      }
    };

    useEffect(() => {
      if (!refContainer) return;
      refContainer.current?.focus();
      setReady(true);
    }, []);

    useEffect(() => {
      if (done) props.stopEditing();
    }, [done]);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return value;
        },
      };
    });

    const checkScroll = (event: any) => {
      if (!done) setDone(true);
    };

    useEffect(() => {
      window.addEventListener('keydown', checkUpAndDown);

      return () => {
        window.removeEventListener('keydown', checkUpAndDown);
      };
    }, [checkUpAndDown, ready]);

    useEffect(() => {
      props.api.addEventListener('bodyScroll', checkScroll);

      return () => {
        props.api.removeEventListener('bodyScroll', checkScroll);
      };
    }, [checkScroll, ready]);

    const onClickDropCellItemHandler = useCallback((dropValue: IDropCellProps) => {
      if (dropValue) {
        setValue(dropValue.CODE);
        setDone(true);
      }
    }, []);

    return (
      <DropDownCellEditorWrapper
        ref={refContainer}
        tabIndex={1} // important - without this the key presses wont be caught
      >
        <DropDownCellItemsWrapper
          width={props.colWidth ? `${props.colWidth}px` : '0px'}
          top={`${props.node.rowHeight}px`}
        >
          {props.values &&
            props.values.map((dropValue: IDropCellProps) => {
              return (
                <DropCellItem
                  key={dropValue.CODE}
                  activeValue={props.values[focusIndex]}
                  dropValue={dropValue}
                  onClickDropCellItemHandler={onClickDropCellItemHandler}
                ></DropCellItem>
              );
            })}
        </DropDownCellItemsWrapper>
      </DropDownCellEditorWrapper>
    );
  }),
);

export default DropCellEditor;
