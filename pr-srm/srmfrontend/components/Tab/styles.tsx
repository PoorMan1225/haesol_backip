import styled from '@emotion/styled';

export const TabMenu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--dred);

  & > div {
    gap: 10px;
    width: 120px;
    place-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ffffff;
    background: #127ca0;
    margin: 15px 15px 0;
    border-radius: 10px 10px 0 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  & > div > span {
    line-height: 15px;
  }

  & > ul {
    display: flex;
    gap: 10px;
    padding: 15px 15px 0;
  }

  & > .tabOption > li {
    background: red;
  }

  ul li {
    text-overflow: ellipsis;
    height: 35px;
    width: 120px;
    text-align: center;
    font-size: 14px;
    line-height: 15px;
  }

  ul li div {
    transition: all 0.2s ease-out;
    place-items: center;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    //text-overflow: clip;
    width: 100%;
    font-size: 12px;
    height: 100%;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  ul li div:hover {
    //background: #f3f3f3;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }

  ul li div.actived {
    transition: all 0.1s ease-in;
    overflow: hidden;
    background: var(--dred);
    color: #fff;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }

  ul li div span {
    border-radius: 0.2rem;
    font-size: 20px;
    margin-right: 5px;
  }

  ul li div span:hover {
    color: white;
    background-color: tomato;
  }

  ul li div.actived span:hover {
    color: black;
    background-color: tomato;
  }
`;
