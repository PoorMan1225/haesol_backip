import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Props {
  isSubMenuOpen: boolean;
}
export const LeftMenuChildItemLv2Wrapper = styled.ul<Props>`
  margin-left: 25px;
  padding: 0px 0 10px;
  width: calc(100% - 25px);
  display: ${(props) => (props.isSubMenuOpen ? 'block' : 'none')};

  & li a {
    font-size: 13px;
    padding: 3px 0;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    color: #333;
  }

  & li a:hover {
    color: var(--red);
    cursor: pointer;
  }

  & li a.actived,
  & li a.actived:hover {
    font-weight: 500;
    color: var(--red);
  }

  & li a::before {
    content: '-';
    margin-right: 5px;
    display: inline-block;
  }

  & li:last-child {
    border-bottom: none;
  }

  & li:last-child a {
    border: none;
  }
`;
