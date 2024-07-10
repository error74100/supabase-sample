import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from './utill/supabase';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mypage from './pages/Mypage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data.session.user);
      }
    };

    session();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/signup" element={<SignUp user={user} />} />
      <Route path="/mypage" element={<Mypage user={user} />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
