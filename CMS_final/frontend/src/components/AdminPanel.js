// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import { useNavigate } from 'react-router-dom';
// import './styles.css';
// import { onImageUploadBefore } from './imageUploadHandler';

// const AdminPanel = ({ setPages }) => {
//   const [content, setContent] = useState('');
//   const navigate = useNavigate();
//   const [newPageTitle, setNewPageTitle] = useState('');
//   const [pages, setPagesState] = useState([]);
//   const [selectedPage, setSelectedPage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => {
//         setPagesState(response.data);
//         if (setPages) setPages(response.data);
//       })
//       .catch(error => console.error('Error loading files:', error));
//   }, [setPages]);

//   const saveContent = (pageTitle) => {
//     axios.post('http://localhost:5000/save', { title: pageTitle, content })
//       .then(response => {
//         alert('Content saved successfully');
//         if (!pages.some(page => page.title === pageTitle)) {
//           const newPages = [...pages, { title: pageTitle }];
//           setPagesState(newPages);
//           if (setPages) setPages(newPages);
//         }
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const handleSave = () => {
//     if (selectedPage) {
//       saveContent(selectedPage);
//     } else {
//       alert('Please select a page or create a new one.');
//     }
//   };

//   const handleCreatePage = () => {
//     const normalizedTitle = newPageTitle.trim().toLowerCase();
//     axios.post('http://localhost:5000/save', { title: normalizedTitle, content })
//       .then(response => {
//         console.log('Page created successfully');
//         setNewPageTitle('');
//         setContent('');
//         axios.get('http://localhost:5000/files')
//           .then(response => setPages(response.data))
//           .catch(error => console.error('Error refreshing page list:', error));
//       })
//       .catch(error => console.error('Error creating page:', error));
//   };

//   return (
//     <div className="admin-panel-container">
//       <div className="sidebar">
//         <h2>Admin Panel</h2>
//         <input
//           type="text"
//           value={newPageTitle}
//           onChange={(e) => setNewPageTitle(e.target.value)}
//           placeholder="New Page Title"
//         />
//         <div className="button-group">
//           <button onClick={handleCreatePage}>Create Page</button>
//           <button onClick={handleSave}>{selectedPage ? 'Update Page' : 'Save Page'}</button>
//         </div>
//         <div className="edit-pages">
//           <button onClick={() => navigate('/edit-pages')}>All Pages</button>
//         </div>
//       </div>
//       <div className="content">
//         <SunEditor
//           setContents={content}
//           onChange={setContent}
//           setOptions={{
//             imageMultipleFile:true,
//             buttonList: [
//               ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//             ],
//             addTagsWhitelist: 'button|template|mark|canvas|label|select|option|input|video|audio|script|iframe',
//             attributesWhitelist: {
//                 all: "button|style|class|data-*|onclick",
//                 button: 'onclick|type|name|value|class',
//                 a: 'href|target|rel|class',
//                 img: 'src|alt|title|width|height|class',
//                 video: 'src|controls|autoplay|loop|muted|preload|poster|width|height|class',
//                 audio: 'src|controls|autoplay|loop|muted|preload|class',
//                 input: 'type|name|value|checked|disabled|readonly|maxlength|size|class',
//             },
//             allowedClassNames: '^se-|_se_|katex|bg-red|text-blue|highlight-yellow|font-bold|italic|underline|font-lg|container|row|col|colgroup|style|flex|grid|custom-button|alert|card|rounded|header|nav|footer|article|body',
//           }}
//           onImageUploadBefore={onImageUploadBefore}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { onImageUploadBefore } from './imageUploadHandler';

const AdminPanel = ({ setPages }) => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [newPageTitle, setNewPageTitle] = useState('');
  const [pages, setPagesState] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => {
        setPagesState(response.data);
        if (setPages) setPages(response.data);
      })
      .catch(error => console.error('Error loading files:', error));
  }, [setPages]);

  const saveContent = (pageTitle) => {
    axios.post('http://localhost:5000/save', { title: pageTitle, content })
      .then(response => {
        alert('Content saved successfully');
        if (!pages.some(page => page.title === pageTitle)) {
          const newPages = [...pages, { title: pageTitle }];
          setPagesState(newPages);
          if (setPages) setPages(newPages);
        }
      })
      .catch(error => console.error('Error saving content:', error));
  };

  const handleSave = () => {
    if (selectedPage) {
      saveContent(selectedPage);
    } else {
      alert('Please select a page or create a new one.');
    }
  };

  const handleCreatePage = () => {
    const normalizedTitle = newPageTitle.trim().toLowerCase();
    axios.post('http://localhost:5000/save', { title: normalizedTitle, content })
      .then(response => {
        console.log('Page created successfully');
        setNewPageTitle('');
        setContent('');
        axios.get('http://localhost:5000/files')
          .then(response => setPages(response.data))
          .catch(error => console.error('Error refreshing page list:', error));
      })
      .catch(error => console.error('Error creating page:', error));
  };

  const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
    const formData = new FormData();
    formData.append('files', imageInfo.file);

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        const imageUrl = response.data.files[0].url;
        targetImgElement.src = imageUrl;
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <input
          type="text"
          value={newPageTitle}
          onChange={(e) => setNewPageTitle(e.target.value)}
          placeholder="New Page Title"
        />
        <div className="button-group">
          <button onClick={handleCreatePage}>Create Page</button>
          <button onClick={handleSave}>{selectedPage ? 'Update Page' : 'Save Page'}</button>
        </div>
        <div className="edit-pages">
          <button onClick={() => navigate('/edit-pages')}>All Pages</button>
        </div>
      </div>
      <div className="content">
        <SunEditor
          setContents={content}
          onChange={setContent}
          setOptions={{
            imageMultipleFile: true,
            buttonList: [
              ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
            ],
            addTagsWhitelist: 'button|template|mark|canvas|label|select|option|input|video|audio|script|iframe',
            attributesWhitelist: {
              all: "button|style|class|data-*|onclick",
              button: 'onclick|type|name|value|class',
              a: 'href|target|rel|class',
              img: 'src|alt|title|width|height|class',
              video: 'src|controls|autoplay|loop|muted|preload|poster|width|height|class',
              audio: 'src|controls|autoplay|loop|muted|preload|class',
              input: 'type|name|value|checked|disabled|readonly|maxlength|size|class',
            },
            allowedClassNames: '^se-|_se_|katex|bg-red|text-blue|highlight-yellow|font-bold|italic|underline|font-lg|container|row|col|colgroup|style|flex|grid|custom-button|alert|card|rounded|header|nav|footer|article|body',
          }}
          onImageUploadBefore={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
