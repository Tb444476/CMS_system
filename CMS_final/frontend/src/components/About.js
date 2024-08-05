import React, { useEffect, useState } from 'react';
import axios from 'axios';


const About = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/load/about');
        setHtmlContent(response.data.content);
      } catch (error) {
        console.error('Error fetching the about page content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default About;
