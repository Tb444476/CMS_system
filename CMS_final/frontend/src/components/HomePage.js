// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function HomePage() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => {
//         setFiles(response.data);
//       })
//       .catch(error => console.error('Error loading files:', error));
//   }, []);

//   return (
//     <div className="HomePage">
//       <h2>Saved Files</h2>
//       <ul>
//         {files.map(file => (
//           <li key={file.title}>
//             <Link to={`/file/${encodeURIComponent(file.title)}`}>{file.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => console.error('Error loading files:', error));
  }, []);

  return (
    <div className="HomePage">
      <h2>Saved Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.title}>
            <Link to={`/admin/file/${encodeURIComponent(file.title)}`}>{file.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;


