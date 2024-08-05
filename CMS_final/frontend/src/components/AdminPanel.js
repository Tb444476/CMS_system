// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import './styles.css';

// const AdminPanel = ({ setPages }) => {
//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState('');
//   const [newPageTitle, setNewPageTitle] = useState('');
//   const [pages, setPagesState] = useState([]);
//   const [selectedPage, setSelectedPage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => {
//         setPagesState(response.data);
//         setPages(response.data);
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
//           setPages(newPages);
//         }
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deletePage = (pageTitle) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         alert('Content deleted successfully');
//         const updatedPages = pages.filter(page => page.title !== pageTitle);
//         setPagesState(updatedPages);
//         setPages(updatedPages);
//         if (selectedPage === pageTitle) {
//           setContent('');
//           setSelectedPage('');
//         }
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const loadContent = (pageTitle) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         setContent(response.data.content);
//         setSelectedPage(pageTitle);
//       })
//       .catch(error => console.error('Error loading content:', error));
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
//         <button onClick={handleCreatePage}>Create New Page</button>
//         <button onClick={handleSave}>{selectedPage ? 'Update Page' : 'Save Page'}</button>
//         <h3>Existing Pages</h3>
//         <ul className="page-list">
//           {pages.map((page, index) => (
//             <li key={index}>
//               <DropdownButton id="dropdown-basic-button" title={page.title}>
//                 <Dropdown.Item onClick={() => loadContent(page.title)}>Edit</Dropdown.Item>
//                 <Dropdown.Item onClick={() => deletePage(page.title)}>Delete</Dropdown.Item>
//               </DropdownButton>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="content">
//         <SunEditor
//           setContents={content}
//           onChange={setContent}
//           setOptions={{
//             buttonList: [
//               ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//             ]
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import './styles.css';
// import { useNavigate , Link} from 'react-router-dom';

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
//         setPages(response.data);
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
//           setPages(newPages);
//         }
//       })
//       .catch(error => console.error('Error saving content:', error));
//   };

//   const deletePage = (pageTitle) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         alert('Content deleted successfully');
//         const updatedPages = pages.filter(page => page.title !== pageTitle);
//         setPagesState(updatedPages);
//         setPages(updatedPages);
//         if (selectedPage === pageTitle) {
//           setContent('');
//           setSelectedPage('');
//         }
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const loadContent = (pageTitle) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         setContent(response.data.content);
//         setSelectedPage(pageTitle);
//       })
//       .catch(error => console.error('Error loading content:', error));
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
//         <h3>Existing Pages</h3>
//         <ul className="page-list">
//           {pages.map((page, index) => (
//             <li key={index}>
//               <DropdownButton id="dropdown-basic-button" title={page.title}>
//                 <Dropdown.Item onClick={() => loadContent(page.title)}>Edit</Dropdown.Item>
//                 <Dropdown.Item onClick={() => deletePage(page.title)}>Delete</Dropdown.Item>
//               </DropdownButton>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="content">
//         <SunEditor
//           setContents={content}
//           onChange={setContent}
//           setOptions={{
//             buttonList: [
//               ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//             ]
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import './styles.css';
// import { useNavigate , Link} from 'react-router-dom';

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

//   const deletePage = (pageTitle) => {
//     axios.delete(`http://localhost:5000/delete/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         alert('Content deleted successfully');
//         const updatedPages = pages.filter(page => page.title !== pageTitle);
//         setPagesState(updatedPages);
//         if (setPages) setPages(updatedPages);
//         if (selectedPage === pageTitle) {
//           setContent('');
//           setSelectedPage('');
//         }
//       })
//       .catch(error => console.error('Error deleting content:', error));
//   };

//   const loadContent = (pageTitle) => {
//     axios.get(`http://localhost:5000/load/${encodeURIComponent(pageTitle)}`)
//       .then(response => {
//         setContent(response.data.content);
//         setSelectedPage(pageTitle);
//       })
//       .catch(error => console.error('Error loading content:', error));
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
//           <button onClick={() => navigate('/edit-pages')}>Edit Pages</button>
//         </div>
//       </div>
//       <div className="content">
//         <SunEditor
//           setContents={content}
//           onChange={setContent}
//           setOptions={{
//             buttonList: [
//               ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//             ]
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './styles.css';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';

// const AdminPanel = ({ setPages }) => {
//   const [htmlContent, setHtmlContent] = useState('');
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
//   const handleChange = (content) => {
//     setHtmlContent(content);
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
//   const editorOptions = {
//     buttonList: [
//       ['font', 'fontSize', 'bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
//       ['removeFormat', 'fontColor', 'hiliteColor', 'align', 'list', 'link', 'image', 'video'],
//       ['codeView', 'preview', 'fullScreen', 'indent', 'outdent', 'undo', 'redo'],
//     ],
//     addTagsWhitelist: 'button|template|mark|canvas|label|select|option|input|video|audio|script|iframe|script',
//     attributesWhitelist: {
//       all: "style|class|data-*|onclick",
//       button: 'onclick|type|name|value|class',
//       a: 'href|target|rel|class',
//       img: 'src|alt|title|width|height|class',
//       video: 'src|controls|autoplay|loop|muted|preload|poster|width|height|class',
//       audio: 'src|controls|autoplay|loop|muted|preload|class',
//       input: 'type|name|value|checked|disabled|readonly|maxlength|size|class',
//     },
//     allowedClassNames: '^se-|__se__|katex|bg-red|text-blue|highlight-yellow|font-bold|italic|underline|font-lg|container|row|col|colgroup|style|flex|grid|custom-button|alert|card|rounded|header|nav|footer|article|body',
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
//         <SunEditor
//           setContents={htmlContent}
//           onChange={handleChange}
//           setOptions={editorOptions}
//         />
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default AdminPanel;
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
//             buttonList: [
//               ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
//             ]
//           }}
//           onImageUploadBefore={onImageUploadBefore} // Ensure this handler is correct
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
          onImageUploadBefore={onImageUploadBefore}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
