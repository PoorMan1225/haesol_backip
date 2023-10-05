import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Props {
  active: boolean;
}
export const LeftMenuChildItemLv1Wrapper = styled.li<Props>`
  .fa.fa-user {
    display: none;
  }

  & > p {
    font-size: 14px;
    transition: all 0.3s;
    color: #333;
    opacity: 0.6;
    font-weight: 600;
    padding: 12px 10px 12px 15px;
    cursor: pointer;

    & > i {
      margin-right: 8px;
      color: #333;
      font-size: 1.2em;
    }
  }

  & > p:hover {
    opacity: 1;
  }

  ${(props) =>
    props.active &&
    css`
      background: #e9e9e9;
      //background-color: red;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;

      & > p {
        opacity: 1;
        padding: 15px 10px 10px 15px;
      }
    `}
`;
