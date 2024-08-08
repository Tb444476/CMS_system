import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AdminPanel from './admin/AdminPanel';
import NavBar from './components/NavBar';
import DynamicPage from './components/DynamicPage';
import Editor from './admin/Editor';
import EditPages from './admin/EditPages';
import './App.css';
import axios from 'axios';
import RenderedFile from './components/RenderedFile';

const App = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => setPages(response.data))
      .catch(error => console.error('Error fetching pages:', error));
  }, []);

  return (
    <Router>
      <MainApp pages={pages} setPages={setPages} />
    </Router>
  );
};

const MainApp = ({ pages, setPages }) => {
  const location = useLocation();

  // Define paths where NavBar should not be displayed
  const noNavBarPaths = [
    '/editor',
    '/edit-pages',
    '/edit',
    '/admin',
  ];

  const hideNavBar = noNavBarPaths.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {!hideNavBar && <NavBar pages={pages} />}
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/edit-pages" element={<EditPages />} />
        <Route path="/edit" element={<Editor />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel setPages={setPages} />} />
        <Route path="/editor/:title" element={<Editor />} />
        <Route path="/:title" element={<DynamicPage />} />
        <Route path="/view/:title" element={<RenderedFile />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
