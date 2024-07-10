import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function NotFoundPage() {
  const nav = useNavigate();
  const goHome = () => {
    nav('/');
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="not_found">
              <p>페이지를 찾을 수 없습니다.</p>

              <div>
                <Button variant="primary" onClick={goHome}>
                  Go Home
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotFoundPage;
