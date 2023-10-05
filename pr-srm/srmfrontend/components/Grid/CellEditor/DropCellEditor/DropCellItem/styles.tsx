import styled from '@emotion/styled';

interface Props {
  isActive: boolean;
}

export const DropDownCellItemWrapper = styled.div<Props>`
  display: flex;
  place-items: center;
  margin-top: 0.1rem;
  justify-content: center;
  border-radius: 0.2rem;
  width: 100%;
  font-size: 11px;
  height: 25px;
  background: ${(props) => (props.isActive ? '#9FC4E7' : '#DDDCDC')};

  &:hover {
    background: #cde1f4;
    cursor: pointer;
  }
`;
