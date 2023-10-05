import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const AdminGnb = styled.ul`
  padding: 0;
  height: calc(100% - 140px);
  overflow-y: auto;
  opacity: 1;
  transition: all 0.3s;
`;

interface Props {
  showLeftMenu: boolean;
}

export const AdminLeftMenu = styled.div<Props>`
  visibility: visible;
  transition: all 0.5s;
  opacity: 1;
  width: 280px;
  height: calc(100% - 35px);
  background: var(--lp);
  position: relative;
  background-size: cover;
  z-index: 15;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  box-shadow: 0 3px 5px rgba(173, 197, 218, 0.8);

  ${(props) =>
    !props.showLeftMenu &&
    css`
      width: 0;
      visibility: hidden;

      ${FullButton} {
        visibility: visible;
      }

      ${AdminGnb} {
        opacity: 0;
        transition: all 0.3s;
        font-size: 0;
      }
    `}

  ${AdminGnb} .active {
    background: #e9e9e9;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
  }

  p.admin_main_menu.actived {
    color: #51caf5;
  }
`;

export const AdminTitle = styled.p`
  width: 100%;
  height: 100px;
  background: url(/resources/Images/logo.svg) 50% 50% no-repeat;
  text-indent: -5000px;
  background-size: 60%;
  opacity: 1;
  transition: all 0.3s;

  span {
    font-size: 23px;
    text-transform: uppercase;
  }
`;

interface LeftMenuButton {
  degrees: number;
}
export const FullButton = styled.button<LeftMenuButton>`
  width: 25px;
  height: 49px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 0 100px 100px 0;
  transition: all 0.3s ease-in-out;
  letter-spacing: -1px;
  position: absolute;
  right: -25px;
  cursor: pointer;
  top: 70px;
  z-index: 15;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;

  ::after {
    width: 10px;
    height: 10px;
    background: url(/resources/Images/arrow_left.png) 50% 50% no-repeat;
    background-size: contain;
    content: '';
    margin: 0 5px 0 0;
    display: inline-block;
    transition: all 0.2s ease-in-out;
    transform: ${(props) => `rotate(${props.degrees}deg)`};
  }
`;

export const AdminFooter = styled.p`
  width: 280px;
  position: absolute;
  bottom: 10px;
  left: 0;
  text-align: center;
  font-size: 11px;
  opacity: 0.6;
`;
