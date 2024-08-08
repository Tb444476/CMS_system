// // SavedFilesPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SavedFilesPage() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => {
//         setFiles(response.data);
//       })
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   return (
//     <div className="SavedFilesPage">
//       <h2>Saved Files</h2>
//       <ul>
//         {files.map(file => (
//           <li key={file.title}>
//             <button>{file.title}</button> {/* Add onClick handler to navigate or display file */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SavedFilesPage;
// RenderedFile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RenderedFile({ match }) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const { title } = match.params;

    axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
      .then(response => {
        setHtmlContent(response.data.content);
      })
      .catch(error => console.error('Error loading content:', error));
  }, [match.params]);

  return (
    <div className="RenderedFile">
      <h2>{match.params.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default RenderedFile;

