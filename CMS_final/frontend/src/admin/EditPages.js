import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const EditPages = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error loading files:', error));
  }, []);

  const deleteContent = (title) => {
    axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
      .then(response => {
        console.log('Content deleted successfully', response.data);
        setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
      })
      .catch(error => console.error('Error deleting content:', error));
  };

  const editContent = (title) => {
    navigate(`/editor?title=${encodeURIComponent(title)}`);
  };

  const viewContent = (title) => {
    window.open(`/${title.toLowerCase()}`, '_blank');
  };

  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <div className='back-page'>
        <button onClick={() => navigate('/admin')}>Back to Admin Panel</button> </div>
      </div>
      <div className="content">
        <h3>All Pages</h3>
        <ul className="page-list">
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.title}</span>
              <div className="page-list-button">
              <button onClick={() => editContent(file.title)}>Edit</button>
              <button onClick={() => deleteContent(file.title)}>Delete</button>
              <button onClick={() => viewContent(file.title)}>View</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditPages;

