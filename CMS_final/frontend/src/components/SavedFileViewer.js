import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SavedFileViewer({ match }) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const title = match.params.title;

    axios.get(`http://localhost:5000/load/${title}`)
      .then(response => {
        setHtmlContent(response.data.content);
      })
      .catch(error => console.error('Error loading content:', error));
  }, [match.params.title]);

  return (
    <div className="SavedFileViewer" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default SavedFileViewer;
