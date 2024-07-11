import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utill/supabase.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

function Header({ user }) {
  const nav = useNavigate();

  const onLogout = async () => {
    await supabase.auth.signOut();
    alert('Logout 되었습니다.');
    nav('/', { replace: false });
    window.location.reload();
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="header_col">
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                <Link to="/" className="logo">
                  <img src="/logo.png" alt="logo" />
                </Link>
              </div>
              {!user ? (
                <div className="p-2 ms-auto">
                  <Link to="/login">Login</Link>
                </div>
              ) : (
                <>
                  <div className="ms-auto">
                    <p className="header_desc">
                      <Link to="/mypage">{user.user_metadata.nickname}</Link>님
                      반갑습니다.
                    </p>
                  </div>
                  <div className="p-2">
                    <Link to="#!" onClick={onLogout}>
                      Logout
                    </Link>
                  </div>
                </>
              )}
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;
