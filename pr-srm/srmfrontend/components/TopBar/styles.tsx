import styled from '@emotion/styled';

export const AdminTopBar = styled.div`
  width: 100%;
  background: var(--db);
  height: 38px;
  display: flex;
  justify-content: space-between;
  z-index: 15;
  box-shadow: 0 2px 3px 0 rgba(173, 197, 218, 0.8);

  .fl a {
    font-size: 15px;
    color: #333;
  }

  ul {
    float: right;
    margin-right: 4rem;
  }

  li {
    float: left;
    line-height: 35px;
    padding-left: 20px;
    color: #ccc;

    & > div {
      cursor: pointer;
      color: #ccc;
      font-size: 11px;

      &:hover {
        color: tomato;
      }
    }
  }

  p a {
    color: #ccc;
    line-height: 35px;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #fff;
    font-weight: 600;
  }
`;

export const ModuleInfo = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 35px;
  align-items: center;
  color: #ccc;
`;

export const AdminContentSize = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
`;
