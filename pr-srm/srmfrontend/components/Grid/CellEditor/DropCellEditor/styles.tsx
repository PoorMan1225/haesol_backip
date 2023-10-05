import styled from '@emotion/styled';

interface Props {
  width: string;
  top: string;
}

export const DropDownCellEditorWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
`;

export const DropDownCellItemsWrapper = styled.div<Props>`
  //margin-top: ${(props) => props.top};
  width: ${(props) => props.width};
  //position: absolute;
  border: 3px solid skyblue;
  z-index: 20;
  left: 0;
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.3rem;
`;

export const DropDownCellItem = styled.div`
  width: 100%;
`;
