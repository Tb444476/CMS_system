// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // function RenderedFile() {
// //   const [htmlContent, setHtmlContent] = useState('');
// //   const { title } = useParams();

// //   useEffect(() => {
// //     if (title) {
// //       axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
// //         .then(response => {
// //           setHtmlContent(response.data.content);
// //         })
// //         .catch(error => console.error('Error loading content:', error));
// //     }
// //   }, [title]);

// //   if (!title) {
// //     return <div>No file selected.</div>;
// //   }

// //   return (
// //     <div className="RenderedFile">
// //       <h2>{title}</h2>
// //       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
// //     </div>
// //   );
// // }

// // export default RenderedFile;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function RenderedFile() {
//   const [htmlContent, setHtmlContent] = useState('');
//   const { title } = useParams();

//   useEffect(() => {
//     if (title) {
//       axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
//         .then(response => {
//           setHtmlContent(response.data.content);
//         })
//         .catch(error => console.error('Error loading content:', error));
//     }
//   }, [title]);

//   if (!title) {
//     return <div>No file selected.</div>;
//   }

//   return (
//     <div className="RenderedFile">
//       <h2>{title}</h2>
//       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//     </div>
//   );
// }

// export default RenderedFile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useParams } from 'react-router-dom';
import '../admin/styles.css';
 // Make sure you have the same styles as other components

const RenderedFile = () => {
  const { title } = useParams();
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
      .then(response => {
        setHtmlContent(response.data.content);
      })
      .catch(error => {
        console.error('There was an error fetching the file content:', error);
      });
  }, [title]);

  const handleSave = () => {
    axios.put(`http://localhost:5000/update/${encodeURIComponent(title)}`, { content: htmlContent })
      .then(response => {
        alert('Content saved successfully');
      })
      .catch(error => {
        console.error('There was an error saving the file content:', error);
      });
  };

  
  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
      <div className="content">
        <h2>Editing: {title}</h2>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default RenderedFile;
