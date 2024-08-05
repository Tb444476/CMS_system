// src/components/CreatePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [pageName, setPageName] = useState('');
  const navigate = useNavigate();

  const handleCreatePage = () => {
    if (!pageName.trim()) {
      alert('Please enter a page name.');
      return;
    }

    axios.post('http://localhost:5000/api/dynamicContent/create-page', { title: pageName })
      .then(response => {
        alert('Page created successfully');
        navigate('/admin/saved-files'); // Redirect to saved files page
      })
      .catch(error => {
        console.error('There was an error creating the page:', error);
        alert('Error creating page');
      });
  };

  return (
    <div>
      <h2>Create New Page</h2>
      <input
        type="text"
        value={pageName}
        onChange={(e) => setPageName(e.target.value)}
        placeholder="Enter page name"
      />
      <button onClick={handleCreatePage}>Create Page</button>
    </div>
  );
};

export default CreatePage;
