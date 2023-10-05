import styled from '@emotion/styled';

export const BoardHeader = styled.div`
  background: #e9e9e9;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  box-shadow: 0.5px 0.5px 0.5px 0.5px gray;
  padding: 10px;
`;

export const Condition = styled.div`
  margin-left: 10px;
  display: flex;
  place-items: center;

  & > input {
    margin-left: 10px;
  }

  & > .condition-button {
    width: 5px;
  }
`;

export const AdminLayout = styled.div`
  width: 100%;
  position: relative;
`;

export const AdminLayoutHalf = styled.div`
  width: calc(50% - 5px);
  height: 100%;
  overflow-y: auto;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
`;

export const AdminLayoutVHalf = styled.div`
  width: 100%;
  height: calc(50% - 5px);
  overflow-y: auto;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
`;

export const Select = styled.select`
  font-family: 'S-CoreDream', sans-serif;
  border-radius: 2px;
  transition-duration: 0.3s;
  min-width: 150px;
  border: 1px solid #ccc;
  height: 35px !important;
  background: url(/images/custom/arrow_down_b.png) calc(100% - 10px) 50% no-repeat #fff;
  background-size: 10px !important;
  padding: 0 30px 0 10px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-left: 50px;

  &:hover {
    border: 1px solid #666;
    box-shadow: 0 0px 3px rgba(173, 197, 218, 0.8);
  }
`;

export const TextArea = styled.textarea`
  font-family: 'S-CoreDream', sans-serif;
  min-height: 100px;
  border-radius: 2px;
  transition-duration: 0.3s;
  border: 1px solid #ccc;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    border: 1px solid #666;
    box-shadow: 0 0px 3px rgba(173, 197, 218, 0.8);
  }
`;

export const FileInput = styled.input`
  font-family: 'S-CoreDream', sans-serif;
  height: 36px !important;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

export const CustomFileUpload = styled.div`
  font-family: 'S-CoreDream', sans-serif;
  padding: 3px 5px !important;
`;

interface ButtonProps {
  buttonColor?: string;
  buttonWidth?: string;
}

export const Button = styled.button<ButtonProps>`
  height: 35px;
  font-family: 'S-CoreDream', sans-serif;
  padding: 0 20px;
  background: ${(props) => (props.buttonColor ? '#f0f0f0' : props.buttonColor)}
  width: ${(props) => (props.buttonWidth ? '10px' : props.buttonWidth)}
  transition: all 0.3s;
  font-weight: 500;
  border: 1px solid #c2c1c1;
  font-size: 13px;
  cursor: pointer;
  box-sizing: border-box;
  margin-right: 5px;

  &:active {
    color: #fff;
    background: #666;
    border-color: #666;
    box-shadow: 0 0px 3px rgba(173, 197, 218, 0.8);
  }
`;

export const BoardInformation = styled.div`
  padding-top: 7px;

  span {
    font-weight: 600;
    color: #ff0000; /* 이 부분에서 --red는 CSS 변수로 정의되어 있어야 합니다. */
  }
`;

export const AdminGridWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 83%;
  padding: 10px;
  background: #fff;
`;
