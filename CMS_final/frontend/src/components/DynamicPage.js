import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Home.css';

const DynamicPage = () => {
  const { title } = useParams(); // Get the title from URL parameters
  const [htmlContent, setHtmlContent] = useState('');
  
  // Log title to debug
  console.log('Page title:', title);

  useEffect(() => {
    if (!title) {
      console.error('No title found in URL parameters');
      return;
    }

    const fetchContent = async () => {
      try {
        // Log the URL being requested
        const url = `http://localhost:5000/load/${title}`;
        console.log('Fetching content from URL:', url);

        const response = await axios.get(url);
        setHtmlContent(response.data.content); // Assuming content is in response.data
      } catch (error) {
        console.error('Error fetching the page content:', error);
      }
    };

    fetchContent();
  }, [title]);

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default DynamicPage;
