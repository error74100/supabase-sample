import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { supabase } from '../utill/supabase.js';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmail, checkPassword } from '../utill/regExp.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login({ user }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const nav = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLogin = async () => {
    if (!checkEmail(loginEmail)) {
      alert('이메일 형식이 잘못 되었습니다. 다시 확인해 주세요.');
      emailRef.current.focus();
      return;
    }

    if (!checkPassword(loginPassword)) {
      alert('비밀번호 형식이 잘못 되었습니다. 다시 확인해 주세요.');
      passwordRef.current.focus();
      return;
    }

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) {
        console.log(error);
        alert('아이디와 비밀번호를 확인해주세요.');
      } else {
        alert('로그인 되었습니다.');
        nav('/', { replace: false });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginOnChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const loginOnChange2 = (e) => {
    setLoginPassword(e.target.value);
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <>
      <Header user={user} />

      <Container>
        <Row>
          <Col>
            {!user && (
              <div className="form_box">
                <h2 className="h2_type tc">로그인</h2>

                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={loginOnChange}
                      ref={emailRef}
                      onKeyDown={onEnter}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={loginPassword}
                      onChange={loginOnChange2}
                      onKeyDown={onEnter}
                      ref={passwordRef}
                      placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
                    />
                  </Form.Group>
                </Form>

                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    onClick={onLogin}
                    onKeyDown={onEnter}
                    size="lg"
                  >
                    로그인
                  </Button>
                </div>

                <div className="login_signup">
                  <p>
                    회원가입 전이라면, 가입 후 이용하실 수 있습니다.{' '}
                    <Link to="/signup"> &gt;&gt; 회원가입</Link>
                  </p>
                </div>
              </div>
            )}

            {user && (
              <div>
                <h2>Login</h2>
                <p>{user.email}님 , 반갑습니다.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
