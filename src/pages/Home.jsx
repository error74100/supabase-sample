import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { supabase } from '../utill/supabase.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Write from '../components/Write.jsx';
import Button from 'react-bootstrap/Button';

const isSelf = (email, user) => {
  if (user && email === user.email) {
    return true;
  } else {
    return false;
  }
};

function Home({ user }) {
  const [datas, setDatas] = useState();

  const mainUser = process.env.REACT_APP_MAIN_USER;
  const subUser = process.env.REACT_APP_SUB_USER;

  const modifySaveEvent = (id) => {
    const getItem = document
      .getElementById(id)
      .getElementsByClassName('title')[0];
    const newTitle = getItem.getElementsByTagName('textarea')[0].value;

    if (newTitle.length < 2) {
      alert('최소 2글자 이상 작성해주세요.');
      return;
    }

    fetchUpdate(id, newTitle);
  };

  const modifyCancleEvent = () => {
    if (window.confirm('취소하시겠습니까?')) {
      window.location.reload();
    }
  };

  const fetchUpdate = async (id, newCont) => {
    const { data } = await supabase
      .from('test_board')
      .update({
        content: newCont,
      })
      .eq('id', id);

    alert('수정 완료되었습니다.');
    window.location.reload();
  };

  const fetchData = async () => {
    const { data } = await supabase
      .from('test_board')
      .select('*')
      .order('created_at', { ascending: true });
    setDatas(data);
  };

  const contentModify = (id) => {
    const getModifyBtn = document
      .getElementById(id)
      .getElementsByClassName('modify_btn')[0];
    getModifyBtn.style.display = 'none';

    const getItem = document
      .getElementById(id)
      .getElementsByClassName('title')[0];

    const getTitle = getItem.innerHTML;
    const saveBtn = document
      .getElementById(id)
      .getElementsByClassName('btn_wrap')[0];
    const btnEl = document.createElement('button');

    btnEl.classList.add('btn');
    btnEl.classList.add('btn-primary');
    btnEl.classList.add('btn-sm');
    btnEl.classList.add('modify_save_btn');
    btnEl.textContent = '저장';

    const btnEl2 = document.createElement('button');
    btnEl2.classList.add('btn');
    btnEl2.classList.add('btn-secondary');
    btnEl2.classList.add('btn-sm');
    btnEl2.classList.add('modify_cancle_btn');
    btnEl2.textContent = '취소';

    btnEl.addEventListener('click', () => {
      modifySaveEvent(id);
    });
    btnEl2.addEventListener('click', modifyCancleEvent);

    saveBtn.prepend(btnEl2);
    saveBtn.prepend(btnEl);

    getItem.innerHTML = `<textarea>${getTitle}</textarea>`;
  };

  const contentDelete = async (id) => {
    if (window.confirm('정말 삭제 하시겠습니까??')) {
      const { data } = await supabase.from('test_board').delete().eq('id', id);

      alert('삭제 되었습니다.');
    }

    fetchData();
  };

  const userImg = (email) => {
    let className = '';

    if (email === mainUser) {
      className = 'p_jh';
    } else if (email === subUser) {
      className = 'p_jw';
    } else {
      className = '';
    }

    return className;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header user={user} />

      <Container>
        <Row>
          <Col>
            <div className="list_wrap">
              {datas &&
                datas.map((item) => {
                  const date = new Date(item.created_at);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  const hour = date.getHours();
                  const min = date.getMinutes();
                  const sec = date.getSeconds();

                  return (
                    <div
                      className={
                        item.Email === mainUser ? 'group type2' : 'group'
                      }
                      key={item.id}
                      id={item.id}
                    >
                      <div className="people">
                        <span className={userImg(item.Email)}></span>

                        <b>{item.nickname}</b>
                      </div>
                      <div className="content">
                        <p className="title">{item.content}</p>

                        <p className="date">
                          {year}-{month}-{day} {hour}:{min}:{sec}
                        </p>

                        {isSelf(item.Email, user) ? (
                          <p className="btn_wrap">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                contentModify(item.id);
                              }}
                              className="modify_btn"
                            >
                              수정
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                contentDelete(item.id);
                              }}
                            >
                              삭제
                            </Button>
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Col>
        </Row>
      </Container>

      <Write user={user} />
    </>
  );
}

export default Home;
