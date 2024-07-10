import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { supabase } from '../utill/supabase.js';
import { useNavigate } from 'react-router-dom';
import { checkEmail, checkPassword } from '../utill/regExp.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const nav = useNavigate();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onChange2 = (e) => {
    setPassword(e.target.value);
  };

  const onSignUp = async () => {
    if (nickname < 2) {
      alert('닉네임 글자수를 다시 확인해 주세요.');
      nicknameRef.current.focus();
      return;
    }

    if (!checkEmail(email)) {
      alert('이메일 형식이 잘못 되었습니다. 다시 확인해 주세요.');
      emailRef.current.focus();
      return;
    }

    if (!checkPassword(password)) {
      alert('비밀번호 형식이 잘못 되었습니다. 다시 확인해 주세요.');
      passwordRef.current.focus();
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            nickname: nickname,
          },
        },
      });

      if (error) {
        console.log(error);
        alert('아이디와 비밀번호를 확인해주세요.');
      } else {
        alert('회원가입이 되었습니다.');
        nav('/', { replace: false });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onSignUp();
    }
  };

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  return (
    <>
      <Header user={user} />

      <Container>
        <Row>
          <Col>
            {!user && (
              <div className="form_box">
                <h2 className="h2_type tc">회원가입</h2>

                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput0"
                  >
                    <Form.Label>Nick name</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="2~8 글자"
                      value={nickname}
                      onChange={onChangeNickname}
                      ref={nicknameRef}
                      onKeyDown={onEnter}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={onChange}
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
                      value={password}
                      onChange={onChange2}
                      placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
                      ref={passwordRef}
                      onKeyDown={onEnter}
                    />
                  </Form.Group>
                </Form>

                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    onClick={onSignUp}
                    onKeyDown={onEnter}
                    size="lg"
                  >
                    회원가입
                  </Button>
                </div>
              </div>
            )}

            {user && (
              <div>
                <h2>Sign Up</h2>
                <p>{user.email}님 , 반갑습니다.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUp;
