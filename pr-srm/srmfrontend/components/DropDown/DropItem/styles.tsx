import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Props {
  depthLevel: number;
  dropdown: boolean;
}

export const DropMenuItems = styled.li<Props>`
  position: relative; //상대 위치 없을 경우 하위 dropdown absolute 하면 menu-items 기준으로 배치안됨.
  font-size: 13px;
  box-sizing: border-box;
  padding: 5px;
  z-index: 72;
  //margin-top: 5px;
  //margin-left: 3px;

  & button {
    display: flex;
    align-items: center;
    color: inherit;
    font-family: 'S-CoreDream', sans-serif;
    background-color: transparent;
    //box-shadow: 0px 1px 1px 1px gray;
    font-weight: 600;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding: 0.6rem 0.8rem;

    & span {
      text-align: left;
      padding: 0.2rem 0.2rem 0.2rem 0.7rem;
    }

    & .arrow::after {
      content: '';
      display: inline-block;
      margin-left: 0.28em;
      vertical-align: 0.09em;
      border-top: 0.42em solid;
      border-right: 0.32em solid transparent;
      border-left: 0.32em solid transparent;
    }
  }

  & button:hover {
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: tomato;
  }

  ${(props) =>
    props.dropdown &&
    css`
      & > button {
        //border-radius: 0.5rem;
        //background-color: #0e0e0e;
        //color: tomato;
      }
    `}

  ${(props) =>
    props.depthLevel > 0 &&
    css`
      & button {
        font-weight: 600;
        font-size: 12px;
      }

      //& button:hover {
      //  background-color: #1c1818;
      //  color: tomato;
      //}
    `};
`;
