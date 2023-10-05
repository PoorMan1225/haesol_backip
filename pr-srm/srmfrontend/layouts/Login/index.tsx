import { LoginBox, LoginButton, LoginContainer, LoginForm, LoginInput, LoginWrapper } from '@layouts/Login/style';
import React, { useCallback, useRef } from 'react';
import useInput from '@hooks/useInput';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import useFetcher from '@utils/useFetcher';

const Login = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { fetcher } = useFetcher();
  const { data, error, mutate } = useSWR('/api/auth/signIn-token', fetcher);

  const validateAndFocus = (inputRef: React.RefObject<HTMLInputElement>, errorMessage: string) => {
    if (!inputRef?.current?.value) {
      toast.error(errorMessage, { toastId: 'toastId' });
      inputRef?.current?.focus();
      return false;
    }
    return true;
  };

  const onClickLoginButton = useCallback(() => {
    if (!validateAndFocus(idRef, '아이디를 입력해주세요')) {
      return;
    }
    if (!validateAndFocus(pwdRef, '비밀번호를 입력해주세요')) {
      return;
    }
    axios
      .post('/api/auth/signIn', {
        id: idRef.current?.value,
        password: pwdRef.current?.value,
      })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.msg, { toastId: 'toastId' });
          return;
        }
        console.log(res.data.response);
        mutate(res.data.response, false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          // 서버 응답은 도착했지만 상태 코드가 실패인 경우
          toast.error(error.response.data.msg, { toastId: 'toastId' });
        } else if (error.request) {
          // 서버 응답이 없는 경우 (네트워크 에러 등)
          toast.error('Network Error', { toastId: 'toastId' });
        } else {
          // 요청을 보내기 전에 발생한 에러
          toast.error('Request Error', { toastId: 'toastId' });
        }
      });
  }, [id, password]);

  if (data) {
    return (
      <Redirect
        to={{
          pathname: '/workspace/home',
          state: data,
        }}
      />
    );
  }

  return (
    <div>
      <LoginContainer>
        <LoginWrapper>
          <h1>
            <a>
              <img alt="해솔정보기술" src={'../../resources/images/logo.png'} />
            </a>
          </h1>
          <LoginBox>
            <h2>login</h2>

            <LoginForm>
              <li>
                <LoginInput className="login_input loginID">
                  <label htmlFor="id">
                    <em className="blind">아이디</em>
                  </label>
                  <input
                    ref={idRef}
                    type="text"
                    className="inputText"
                    name="id"
                    id="id"
                    maxLength={20}
                    title="아이디 "
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={onChangeId}
                  />
                </LoginInput>
              </li>
              <li>
                <LoginInput className="login_input loginPW">
                  <label htmlFor="password">
                    <em className="blind">비밀번호</em>
                  </label>
                  <input
                    ref={pwdRef}
                    type="password"
                    name="password"
                    id="password"
                    maxLength={20}
                    className="inputText"
                    title="비밀번호 "
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={onChangePassword}
                  />
                </LoginInput>
              </li>
              <li>
                <ul>
                  <li>
                    <div className="checkbox">
                      <div className="check">
                        <input type="checkbox" name="checkId" className="check2" id="checkId" />
                        <label htmlFor="checkId">아이디 저장</label>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <LoginButton
                  type={'button'}
                  className="loginBtn"
                  title="로그인"
                  value="로그인"
                  onClick={onClickLoginButton}
                >
                  로그인
                </LoginButton>
              </li>
            </LoginForm>
          </LoginBox>
          <p>
            가입문의 <b>OOO@haesolinfo.com</b>
          </p>
        </LoginWrapper>
      </LoginContainer>
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={2000}
        draggable={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};
export default Login;
