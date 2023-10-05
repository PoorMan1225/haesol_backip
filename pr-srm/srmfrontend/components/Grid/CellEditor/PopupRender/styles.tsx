import styled from '@emotion/styled';

export const PopupRenderWrapper = styled.div`
  display: flex;
  place-items: center;
  padding-left: 10px;
  padding-right: 10px;

  & > button {
    border-radius: 0.2rem;
    width: 25px;
    height: 25px;
    cursor: pointer;
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #717070;
  }
  
  & > button:active {
    background: #b6deab;
  }
`;

interface Props {
  width: string;
}

export const PopupValue = styled.div<Props>`
  width: ${(props) => props.width};
`;
