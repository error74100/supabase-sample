import { supabase } from '../utill/supabase.js';

import { useState } from 'react';

function Write({ user }) {
  const [cont, setCont] = useState('');

  const onChange = (e) => {
    setCont(e.target.value);
  };

  const onSave = (e) => {
    if (cont.length < 2) {
      alert('2글자 이상 작성해주세요.');
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase.from('test_board').insert({
        content: cont,
        Email: user.email,
        nickname: user.user_metadata.nickname,
      });

      if (error) {
        alert('등록 실패하였습니다.');
      } else {
        alert('등록 되었습니다.');
        window.location.reload();
      }
    };

    fetchData();
  };

  return (
    <>
      {user ? (
        <div className="write_wrap">
          <div className="inner">
            <textarea
              value={cont}
              placeholder="오늘 하루를 한줄로 남겨 보세요."
              onChange={onChange}
            ></textarea>
            <button onClick={onSave}>저장</button>
          </div>
        </div>
      ) : (
        <div className="write_wrap default_type">
          <div className="inner">로그인 후 글을 작성할 수 있습니다.</div>
        </div>
      )}
    </>
  );
}

export default Write;
