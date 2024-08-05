import axios from 'axios';

export const onImageUploadBefore = (files, info, uploadHandler) => {
  if (files.length === 0) {
    return;
  }

  const formData = new FormData();
  formData.append('file', files[0]); // Ensure the field name matches backend

  const url = 'http://localhost:5000/upload'; // Ensure this matches your backend endpoint

  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Add other headers if needed
    }
  })
  .then(response => {
    const imageUrl = response.data.body.url;
    uploadHandler({
      result: [{ url: imageUrl, name: response.data.body.docId }]
    });
  })
  .catch(error => {
    console.error('Image upload failed:', error);
    alert('Something went wrong while uploading the image!');
  });
};
