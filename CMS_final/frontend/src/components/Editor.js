import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { onImageUploadBefore } from './imageUploadHandler';

function Editor() {
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [showExistingPages, setShowExistingPages] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error loading files:', error));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get('title');
    if (title) {
      axios.get(`http://localhost:5000/load/${encodeURIComponent(title)}`)
        .then(response => {
          setHtmlContent(response.data.content);
          setFileName(title);
          setEditingFile(title);
        })
        .catch(error => console.error('Error loading content for editing:', error));
    }
  }, [location.search]);

  const handleChange = (content) => {
    setHtmlContent(content);
  };

  const saveContent = () => {
    if (!fileName.trim()) {
      alert('Please enter a file name.');
      return;
    }

    const formattedContent = htmlContent;

    const endpoint = editingFile ? `http://localhost:5000/update/${encodeURIComponent(fileName)}` : 'http://localhost:5000/save';
    const method = editingFile ? 'put' : 'post';

    axios[method](endpoint, { title: fileName, content: formattedContent })
      .then(response => {
        console.log('Content saved successfully', response.data);
        alert('Content saved successfully');
        setFileName('');
        setHtmlContent('');
        setEditingFile(null);

        axios.get('http://localhost:5000/files')
          .then(response => setFiles(response.data))
          .catch(error => console.error('Error loading files:', error));
      })
      .catch(error => console.error('Error saving content:', error));
  };

  const editContent = (title) => {
    navigate(`/editor?title=${encodeURIComponent(title)}`);
  };

  const deleteContent = (title) => {
    axios.delete(`http://localhost:5000/delete/${encodeURIComponent(title)}`)
      .then(response => {
        console.log('Content deleted successfully', response.data);
        setFiles(prevFiles => prevFiles.filter(file => file.title !== title));
      })
      .catch(error => console.error('Error deleting content:', error));
  };

  const toggleExistingPages = () => {
    setShowExistingPages(!showExistingPages);
  };

  const viewContent = (title) => {
    window.open(`/${title.toLowerCase()}`, '_blank');
  };

  
  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="New Page Title"
        />
        <div className="saving-page">
          <button onClick={saveContent}>{editingFile ? 'Update Page' :'Save Page'}</button>
          <button onClick={() => navigate('/edit-pages')}>All Pages</button>
        </div>
        {showExistingPages && (
          <ul className="page-list">
            {files.map((file, index) => (
              <li key={index}>
                <span>{file.title}</span>
                <div className="page-list-button">
                <div className="edit-button"><button onClick={() => editContent(file.title)}>Edit</button></div>
                <div className="delete-button"><button onClick={() => deleteContent(file.title)}>Delete</button></div>
                <div className="view-button"><button onClick={() => viewContent(file.title)}>View</button></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="content">
        <h2>Editor</h2>
        <SunEditor
  setContents={htmlContent} // use htmlContent instead of content
  onChange={setHtmlContent} // use setHtmlContent instead of setContent
  setOptions={{
    buttonList: [
      ['undo', 'redo', 'bold', 'italic', 'underline', 'strike', 'list', 'align', 'fontSize', 'formatBlock', 'table', 'image', 'link', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview']
    ],
    addTagsWhitelist: '*', // Allow all tags
    attributesWhitelist: {
      all: '*', // Allow all attributes for all tags
    },
    allowedClassNames: '.*',
    imageMultipleFile: true,
    __allowedScriptTag:true,
  }}
  onImageUploadBefore={onImageUploadBefore}
/>
      </div>
    </div>
  );
}

export default Editor;
