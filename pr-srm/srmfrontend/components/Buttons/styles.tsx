import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Props {
  isDrop: boolean;
  depthLevel: number;
}
export const DropDownWrapper = styled.ul<Props>`
  position: absolute;
  border-radius: 0.5rem;
  margin-top: 7px;
  right: 0; /* 상대위치로 결정 되었기 때문에 right 0 으로 해도 끝으로 이동하지 않는다. */
  left: auto;
  font-size: 0.875rem;
  z-index: 9999;
  min-width: 10rem;
  list-style: none;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  background-color: #edebeb;
  display: none;

  ${(props) =>
    props.isDrop &&
    css`
      display: block;
    `};

  ${(props) =>
    props.depthLevel > 1 &&
    css`
      position: absolute;
      left: 100%;
      top: -7px;
    `}
`;

export const ButtonsWrapper = styled.div`

`
