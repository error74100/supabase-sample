import { useRef, useState } from 'react';
import Header from '../components/Header.jsx';
import { supabase } from '../utill/supabase.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Mypage({ user }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isModify, setIsModify] = useState(false);
  const nicknameRef = useRef();

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onModify = (e) => {
    const input = document.getElementById('exampleForm.ControlInput1');

    console.log(user.id);

    setIsModify(true);

    input.removeAttribute('disabled');
    input.removeAttribute('readonly');
    nicknameRef.current.focus();
  };

  const onModifySave = (e) => {
    if (nickname.length < 2) {
      alert('2~8 글자로 설정해 주세요.');
      nicknameRef.current.focus();
      return;
    } else if (8 < nickname.length) {
      alert('2~8 글자로 설정해 주세요.');
      nicknameRef.current.focus();
      return;
    } else {
      nicknameUpdate();
    }

    setIsModify(false);
  };

  const onModifyCancle = (e) => {
    const input = document.getElementById('exampleForm.ControlInput1');

    setNickname('');
    input.setAttribute('disabled', true);
    input.setAttribute('readonly', true);

    setIsModify(false);
  };

  const nicknameUpdate = async () => {
    try {
      let { data, error } = await supabase.auth.updateUser({
        data: { nickname: nickname },
      });

      alert('변경 되었습니다.');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header user={user} />

      <Container>
        <Row>
          <Col>
            <div className="form_box">
              <h2 className="h2_type tc">My Page</h2>

              {user && (
                <>
                  <Form>
                    <Form.Group
                      className="mb-3 nickname_wrap"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Nick name
                        {!isModify && (
                          <Button
                            variant="success"
                            onClick={onModify}
                            size="sm"
                          >
                            편집
                          </Button>
                        )}
                        {isModify && (
                          <>
                            <Button
                              variant="primary"
                              onClick={onModifyCancle}
                              size="sm"
                            >
                              취소
                            </Button>
                            <Button
                              variant="success"
                              onClick={onModifySave}
                              size="sm"
                            >
                              저장
                            </Button>
                          </>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={user.user_metadata.nickname}
                        value={nickname}
                        onChange={onChangeNickname}
                        ref={nicknameRef}
                        disabled
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder={user.email}
                        disabled
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Mypage;
