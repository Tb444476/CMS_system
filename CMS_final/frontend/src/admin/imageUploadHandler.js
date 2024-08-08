// import axios from 'axios';

// export const onImageUploadBefore = (files, info, uploadHandler) => {
//   if (files.length === 0) {
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', files[0]); // Ensure the field name matches backend

//   const url = 'http://localhost:5000/upload'; // Ensure this matches your backend endpoint

//   axios.post(url, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       // Add other headers if needed
//     }
//   })
//   .then(response => {
//     const imageUrl = response.data.body.url;
//     uploadHandler({
//       result: [{ url: imageUrl, name: response.data.body.docId }]
//     });
//   })
//   .catch(error => {
//     console.error('Image upload failed:', error);
//     alert('Something went wrong while uploading the image!');
//   });
// };


// import axios from 'axios';

// export const onImageUploadBefore = (file, info, uploadHandler) => {
//     console.log("file: ", file[0]);
//     const fd = new FormData();
//     fd.append('file', file[0]);
//     fd.append('entityId', 123);
//     fd.append('docType', "PRODUCT_IMAGE");

//     // Remove the token and config part if you do not use it
//     // const token = sessionStorage.getItem("token");
//     const config = {
//         headers: {
//             // Authorization: "Bearer " + JSON.parse(token).replaceAll('"', ""),
//             "ChannelKey": "026bdbcea67670ef6a413c0f6309014efb17f0c96ee53faef8a80285c947371d"
//         },
//     };

//     const url = 'http://localhost:5000/upload'; // Use your actual upload endpoint

//     axios.post(url, fd, config)
//         .then((res) => {
//             console.log(res);
//             const response = {
//                 result: [
//                     {
//                         url: res.data.body.url, // Use the URL returned by the server
//                         name: res.data.body.docId,
//                     }
//                 ]
//             };
//             uploadHandler(response); // Pass the response to the uploadHandler
//         })
//         .catch((error) => {
//             console.error("Image upload failed:", error);
//             alert("Something went wrong while uploading the image!");
//         });
// };

import axios from 'axios';

export const onImageUploadBefore = (files, info, uploadHandler) => {
    const fd = new FormData();
    files.forEach((file, index) => {
        fd.append('files', file);
    });
    fd.append('entityId', 123);
    fd.append('docType', "PRODUCT_IMAGE");

    const config = {
        headers: {
            "ChannelKey": "026bdbcea67670ef6a413c0f6309014efb17f0c96ee53faef8a80285c947371d"
        },
    };

    const url = 'http://localhost:5000/upload'; // Use your actual upload endpoint

    axios.post(url, fd, config)
        .then((res) => {
            const response = {
                result: res.data.files.map(file => ({
                    url: file.url,
                    name: file.docId
                }))
            };
            uploadHandler(response); // Pass the response to the uploadHandler
        })
        .catch((error) => {
            console.error("Image upload failed:", error);
            alert("Something went wrong while uploading the image!");
        });
};
