import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { AddLandmark } from './components/Landmarks/AddLandmark/AddLandmark';

import { AuthContext } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PageNotFound } from './components/404/404';

import { AllLandmarks } from './components/Landmarks/AllLandmarks/AllLandmarks';

function App() {
  const [user, setAuth] = useLocalStorage('auth', {})
  // const navigate = useNavigate();
  const isAuth = user?._id ? true : false

  const userLogin = (authData) => {
    setAuth(authData);
  }

  const userLogout = () => {
    setAuth({});
  }

  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout, isAuth }}>
      <div>
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/add-landmark' element={<AddLandmark />} />
            <Route path='/all-landmarks' element={<AllLandmarks />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
