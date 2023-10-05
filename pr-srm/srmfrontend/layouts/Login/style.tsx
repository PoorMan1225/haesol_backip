import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  //background: url(../../resources/images/logo.jpg) 50% 50% no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginWrapper = styled.div`
  text-align: center;

  & h1 {
    animation: login 0.7s both;
  }

  & h1 img {
    //background: url(../../resources/images/logo.png);
  }

  & p {
    animation: login 0.7s both;
  }

  @keyframes login {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const LoginBox = styled.div`
  margin: 40px 0;
  padding: 50px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #ededed;
  border-radius: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  animation: login 0.7s both;
  animation-delay: 0.2s;
  transition: all 0.2s;

  &:hover {
    border-color: #ccc;
  }

  & h2 {
    font-size: 30px;
    color: #000;
    line-height: 1.3em;
    font-weight: 900;
    margin-bottom: 30px;
    text-transform: uppercase;
  }
`;

export const LoginForm = styled.ul`
  width: 320px;

  & > li {
    margin-bottom: 15px;
  }

  & > li:last-child {
    margin: 0;
  }

  & .checkbox label {
    color: #000;
  }

  & .loginID label {
    background: url(../../resources/images/icon_login1.png) 70% 50% no-repeat;
  }

  & .loginPW label {
    background: url(../../resources/images/icon_login2.png) 70% 50% no-repeat;
  }
`;

export const LoginInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #f1f1f1;
  border-radius: 50px;

  & .inputText {
    border: none;
    background: none;
    height: 60px;
    border-radius: 0 50px 50px 0;
    width: calc(100% - 60px);
    font-weight: 600;
  }

  & .inputText:hover {
    box-shadow: none;
  }

  & label {
    width: 60px;
    height: 60px;
    display: inline-block;
    opacity: 0.2;
    transition: all 0.2s;
  }

  &:hover label {
    opacity: 0.5;
  }
`;

export const LoginButton = styled.button`
  background: var(--red);
  width: 100%;
  border-radius: 50px;
  height: 55px;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 1.2em;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #9e0b0f;
  }
`;
