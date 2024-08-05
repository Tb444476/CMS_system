import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contact.module.css'

const Contact = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/load/contact'); // Ensure the endpoint matches
        setHtmlContent(response.data.content); // Assuming content is in response.data
      } catch (error) {
        console.error('Error fetching the contact page content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <h1>Contact Page</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Contact;
