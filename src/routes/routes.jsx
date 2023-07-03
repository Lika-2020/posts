import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main/Main'
import UserInfo from '../pages/UserInfo/UserInfo'
import AboutMe from '../pages/AboutMe/AboutMe'

function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/about-me" element={<AboutMe />} />
      </Routes>
    );
  }
  
  export default AppRoutes;
  