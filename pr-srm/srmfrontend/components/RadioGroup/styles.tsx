import styled from '@emotion/styled';

export const RadioFieldSet = styled.fieldset`
  display: flex;
  justify-content: center;
  place-items: center;
  border: none;
  margin-left: 0;

  & > label {
    font-size: 12px;
    line-height: 1.5rem;
    padding: 0.2em 0.4em;
  }

  [type='radio'],
  span {
    vertical-align: middle;
  }

  [type='radio'] {
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: border 0.2s ease-in-out;
  }

  [type='radio']:checked {
    border: 0.4em solid var(--red);
  }

  [type='radio']:focus-visible {
    outline: max(2px, 0.1em) dotted tomato;
    outline-offset: max(2px, 0.1em);
  }

  [type='radio']:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }

  [type='radio']:hover + span {
    cursor: pointer;
  }

  [type='radio']:disabled {
    background-color: lightgray;
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
  }

  [type='radio']:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
