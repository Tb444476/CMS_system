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
import './styles.css'; // Make sure you have the same styles as other components

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

  const editorOptions = {
    buttonList: [
      ['font', 'fontSize', 'bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
      ['removeFormat', 'fontColor', 'hiliteColor', 'align', 'list', 'link', 'image', 'video'],
      ['codeView', 'preview', 'fullScreen', 'indent', 'outdent', 'undo', 'redo'],
    ],
    addTagsWhitelist: 'button|template|mark|canvas|label|select|option|input|video|audio|script|iframe|script',
    attributesWhitelist: {
      all: "style|class|data-*|onclick",
      button: 'onclick|type|name|value|class',
      a: 'href|target|rel|class',
      img: 'src|alt|title|width|height|class',
      video: 'src|controls|autoplay|loop|muted|preload|poster|width|height|class',
      audio: 'src|controls|autoplay|loop|muted|preload|class',
      input: 'type|name|value|checked|disabled|readonly|maxlength|size|class',
    },
    allowedClassNames: '^se-|__se__|katex|bg-red|text-blue|highlight-yellow|font-bold|italic|underline|font-lg|container|row|col|colgroup|style|flex|grid|custom-button|alert|card|rounded|header|nav|footer|article|body',
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
