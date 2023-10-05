import styled from '@emotion/styled';

interface PopupContainerProps {
  isShow: boolean;
}

export const PopupContainer = styled.div<PopupContainerProps>`
  display: ${(props) => (props.isShow ? 'block' : 'none')};
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0, 0);
  width: 100%;
  height: 100%;
  background-color: rgba(151, 149, 149, 0.3);
  z-index: 99;
`;

export const Popup = styled.div`
  border-radius: 1.5rem;
  position: relative;
  box-shadow: 1px 1px 5px 3px gray;
  left: calc(50% - 250px);
  top: calc(50% - 300px);
  width: 500px;
  height: 600px;
`;

export const PopupTitleWrapper = styled.header`
  padding: 0.6rem;
  display: flex;
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 30px;
  background-color: var(--db);
  place-items: center;
  justify-content: space-between;

  & .popup-title {
    color: white;
  }

  & span {
    cursor: pointer;
    width: 20px;
    height: 20px;
    text-align: center;
    color: white;
    border-radius: 0.5rem;
    line-height: 20px;
    background-color: var(--dred);
    font-size: 14px;
  }

  & span:hover {
    background-color: tomato;
  }
`;

export const PopupConditionWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: #3c3c3c;
  place-items: center;
  justify-content: space-between;
  height: 60px;
  
  & > div {
    margin-left: 10px;
    display: flex;
    place-items: center;
  }

  & > div > span {
    margin-left: 10px;
    margin-right: 10px;
    color: white;
  }
  
  & > div > input {
    height: 30px !important;
  }
  
  & button {
    border-radius: 0.3rem;
    height: 30px;
  }
`;

export const PopupGridWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  height: 450px;
  width: 100%;
  background: #fff;
`;

export const PopupButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--dred);
  padding: 1.1rem;
  height: 60px;
  box-sizing: border-box;
  justify-content: end;
  border-radius: 0 0 1.5rem 1.5rem;

  & button {
    height: 30px;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.3rem;
    width: 75px;
    margin-right: 5px;
  }

  & button:active {
    background-color: tomato;
  }
`;
