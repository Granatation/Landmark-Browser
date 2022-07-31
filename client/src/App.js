import { Route, Routes } from 'react-router-dom';
// import { useEffect, useState } from 'react';

import { AuthContext } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';

import {useLocalStorage} from './hooks/useLocalStorage';

function App() {
  const [user, setAuth] = useLocalStorage('auth', {})
  // const navigate = useNavigate();

  const userLogin = (authData) => {
    setAuth(authData);
  }

  const userLogout = () => {
    setAuth({});
  }

  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout }}>
      <div>
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
