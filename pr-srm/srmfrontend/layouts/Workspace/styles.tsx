import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  min-width: 1300px;
  min-height: 800px;
`;

interface Props {
  showLeftMenu: boolean;
}

export const AdminRightContents = styled.div<Props>`
  width: calc(100% - 280px);
  height: calc(100% - 35px);
  box-sizing: border-box;
  position: static;
  transition: all 0.5s;

  ${(props) =>
    !props.showLeftMenu &&
    css`
      width: calc(100% - 1px);
    `}
`;

export const NewPages = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  animation-name: faceOff;
  animation-duration: 300ms;

  &.actived {
    display: block;
  }

  @keyframes faceOff {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const NewPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;

  &.actived {
    opacity: 1;
    transition: opacity 0.5s ease; /* 애니메이션 속성 설정 */
  }
`;

export const StyledTopButtonWrap = styled.div`
  height: 40px;
  display: flex;
  gap: 3px;
  align-items: center;
  margin-right: 15px;

  button {
    border: 1px solid #666;
    color: #fff;
    border-radius: 3px;
    background: var(--db);

    &:hover {
      background: #fff;
      border-color: #fff;
      color: #000;
    }
  }
`;
