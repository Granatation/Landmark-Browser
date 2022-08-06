import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { AddLandmark } from './components/Landmarks/AddLandmark/AddLandmark';
import { PageNotFound } from './components/404/404';
import { AllLandmarks } from './components/Landmarks/AllLandmarks/AllLandmarks';
import { Details } from './components/Landmarks/Details/Details';
import { Edit } from './components/Landmarks/Edit/Edit';
import { Delete } from './components/Landmarks/Delete/Delete';
import { Visit } from './components/Landmarks/Visit/Visit';
import { MyProfile } from './components/MyProfile/MyProfile';

import { AuthContext } from './contexts/AuthContext';
import { LandmarkContext } from './contexts/LandmarkContext';
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
  const [user, setAuth] = useLocalStorage('auth', {})

  const [landmarks, setLandmarks] = useState([]);

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

        <LandmarkContext.Provider value={{ landmarks, setLandmarks }}>
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/add-landmark' element={<AddLandmark />} />
              <Route path='/all-landmarks' element={<AllLandmarks />} />
              <Route path='/all-landmarks/:landmarkId' element={<Details />} />
              <Route path='/all-landmarks/:landmarkId/edit' element={<Edit />} />
              <Route path='/all-landmarks/:landmarkId/delete' element={<Delete />} />
              <Route path='/all-landmarks/:landmarkId/visit' element={<Visit />} />
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </main>
        </LandmarkContext.Provider>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
