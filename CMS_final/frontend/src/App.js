// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
// import About from './components/About';
// import Services from './components/Services';
// import Contact from './components/Contact';
// import AdminPanel from './admin/AdminPanel';
// import NavBar from './components/NavBar';

// import Editor from './admin/Editor';
// import EditPages from './admin/EditPages';
// import './App.css';
// import axios from 'axios';
// import DynamicPage from './components/DynamicPage';
// import Login from './admin/Login';
// import Register from './admin/Register';
// import RenderedFile from './components/RenderedFile';

// const App = () => {
//   const [pages, setPages] = useState([]);
//   const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setPages(response.data))
//       .catch(error => console.error('Error fetching pages:', error));
//   }, []);

//   const handleLogin = (token) => {
//     setAuthToken(token);
//     localStorage.setItem('token', token);
//   };

//   const handleLogout = () => {
//     setAuthToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <Router>
//       <MainApp pages={pages} setPages={setPages} authToken={authToken} onLogin={handleLogin} onLogout={handleLogout} />
//     </Router>
//   );
// };

// const MainApp = ({ pages, setPages, authToken, onLogin, onLogout }) => {
//   const location = useLocation();

//   // Define paths where NavBar should not be displayed
//   const noNavBarPaths = [
//     '/editor',
//     '/edit-pages',
//     '/edit',
//     '/admin',
//     '/login',
//     '/register',
//   ];

//   const hideNavBar = noNavBarPaths.some(path => location.pathname.startsWith(path));

//   return (
//     <div>
//       {!hideNavBar && <NavBar pages={pages} onLogout={onLogout} />}
//       <Routes>
//         <Route path="/login" element={<Login onLogin={onLogin} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/editor" element={<Editor />} />
//         <Route path="/edit-pages" element={<EditPages />} />
//         <Route path="/edit" element={<Editor />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/admin" element={authToken ? <AdminPanel setPages={setPages} /> : <Navigate to="/login" />} />
//         <Route path="/editor/:title" element={<Editor />} />
//         <Route path="/:title" element={<DynamicPage />} />
//         <Route path="/view/:title" element={<RenderedFile />} />
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//     </div>
//   );
// };

// // export default App;
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
// import About from './components/About';
// import Services from './components/Services';
// import Contact from './components/Contact';
// import AdminPanel from './admin/AdminPanel';
// import NavBar from './components/NavBar';
// import Editor from './admin/Editor';
// import EditPages from './admin/EditPages';
// import './App.css';
// import axios from 'axios';
// import DynamicPage from './components/DynamicPage';
// import Login from './admin/Login';
// import Register from './admin/Register';
// import RenderedFile from './components/RenderedFile';
// import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// const App = () => {
//   const [pages, setPages] = useState([]);
//   const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setPages(response.data))
//       .catch(error => console.error('Error fetching pages:', error));
//   }, []);

//   const handleLogin = (token) => {
//     setAuthToken(token);
//     localStorage.setItem('token', token);
//   };

//   const handleLogout = () => {
//     setAuthToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <Router>
//       <MainApp pages={pages} setPages={setPages} authToken={authToken} onLogin={handleLogin} onLogout={handleLogout} />
//     </Router>
//   );
// };

// const MainApp = ({ pages, setPages, authToken, onLogin, onLogout }) => {
//   const location = useLocation();

//   // Define paths where NavBar should not be displayed
//   const noNavBarPaths = [
//     '/editor',
//     '/edit-pages',
//     '/edit',
//     '/admin',
//     '/login',
//     '/register',
//   ];

//   const hideNavBar = noNavBarPaths.some(path => location.pathname.startsWith(path));

//   return (
//     <div>
//       {!hideNavBar && <NavBar pages={pages} onLogout={onLogout} />}
//       <Routes>
//         <Route path="/login" element={<Login onLogin={onLogin} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/editor" element={<Editor />} />
//         <Route path="/edit-pages" element={<EditPages />} />
//         <Route path="/edit" element={<Editor />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/admin" element={<ProtectedRoute element={<AdminPanel setPages={setPages} />} authToken={authToken} />} />
//         <Route path="/editor/:title" element={<Editor />} />
//         <Route path="/:title" element={<DynamicPage />} />
//         <Route path="/view/:title" element={<RenderedFile />} />
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AdminPanel from './admin/AdminPanel';
import NavBar from './components/NavBar';
import Editor from './admin/Editor';
import EditPages from './admin/EditPages';
import './App.css';
import axios from 'axios';
import DynamicPage from './components/DynamicPage';
import Login from './admin/Login';
import Register from './admin/Register';
import RenderedFile from './components/RenderedFile';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './admin/ResetPassword'; 

import ForgotPassword from './admin/ForgotPassword'; // Import the new component

const App = () => {
  const [pages, setPages] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => setPages(response.data))
      .catch(error => console.error('Error fetching pages:', error));
  }, []);

  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <MainApp pages={pages} setPages={setPages} authToken={authToken} onLogin={handleLogin} onLogout={handleLogout} />
    </Router>
  );
};

const MainApp = ({ pages, setPages, authToken, onLogin, onLogout }) => {
  const location = useLocation();

  const noNavBarPaths = [
    '/editor',
    '/edit-pages',
    '/edit',
    '/admin',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'

  ];

  const hideNavBar = noNavBarPaths.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {!hideNavBar && <NavBar pages={pages} onLogout={onLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        
       
        <Route path="/register" element={<Register />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/edit-pages" element={<EditPages />} />
        <Route path="/edit" element={<Editor />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPanel setPages={setPages} />} authToken={authToken} />} />
        <Route path="/editor/:title" element={<Editor />} />
        <Route path="/:title" element={<DynamicPage />} />
        <Route path="/view/:title" element={<RenderedFile />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
