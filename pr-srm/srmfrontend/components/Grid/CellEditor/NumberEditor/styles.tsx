import styled from '@emotion/styled';

export const NumberEditorInput = styled.input`
  font-size: calc(var(--ag-font-size) + 1px);
  padding-left: calc(var(--ag-cell-horizontal-padding) - 1px);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  outline: none !important;
  border: 2px solid #aad5f8;
  border-radius: 0.2rem;

  &:focus {
    outline: none !important;
    border-radius: 0.2rem;
  }
`;
