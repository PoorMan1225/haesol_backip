import styled from '@emotion/styled';

export const BoardHeader = styled.div`
  background: #fff;
  width: 100%;
  margin-top: 10px;
  
  
`;

// export const AdminContents = styled.div`
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap;
//   width: 100%;
//   background: #fff;
//   height: calc(100% - 120px);
//   padding: 20px;
//   box-sizing: border-box;
//   overflow-y: auto;

//   &.headerY {
//     height: calc(100% - 120px);
//     padding: 0 !important;
//     background: #efefef;

//     ${BoardHeader} {
//       width: 100%;
//       padding: 20px;
//     }    

//     form {
//       height: 100%;
//     }
//   }
// `;

export const AdminContents = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  background: #fff;
  height: calc(100% - 120px);
  padding: 0 !important;
  box-sizing: border-box;
  overflow-y: auto;

  ${BoardHeader} {
      width: 100%;
      /* padding: 20px; */
    }    

    form {
      height: 100%;
    }  
`;

export const AdminLayout = styled.div`  
  width: 100%;  
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

export const InputText = styled.input`
  font-family: 'S-CoreDream', sans-serif;
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 35px !important;
  background: #fff;
  transition-duration: 0.3s;
  padding: 0 10px;
  box-sizing: border-box;
  margin-right: 10px;

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

export const Button = styled.button`
  height: 35px;
  padding: 0 20px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  transition: all 0.3s;
  font-size: 13px;
  box-sizing: border-box;
  margin-right: 10px;

  &:hover {
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
  /* height: 100%; */
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
`;