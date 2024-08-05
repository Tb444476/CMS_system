import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.module.css';

const Services = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/load/services');
        setHtmlContent(response.data.content);
      } catch (error) {
        console.error('Error fetching the services page content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="services-container">
      <header>
        <h1>Our Services</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Services;
