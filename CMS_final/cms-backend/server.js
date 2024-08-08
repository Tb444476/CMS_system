
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Content = require('./models/content');
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://tejas_Bhame:Tejas%231234@cluster0.78fhj3m.mongodb.net/suneditor?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 30000 // 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use(express.static('uploads'));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Content Management Routes
const normalizeTitle = (title) => title.trim().toLowerCase();

app.post('/save', (req, res) => {
  const { title, content } = req.body;
  const normalizedTitle = normalizeTitle(title);

  Content.findOneAndUpdate({ title: normalizedTitle }, { content }, { upsert: true, new: true })
    .then(savedContent => {
      console.log('Content saved successfully:', savedContent);
      res.json({ message: 'Content saved successfully!', savedContent });
    })
    .catch(err => {
      console.error('Error saving content:', err);
      res.status(500).json({ error: 'Error saving content' });
    });
});

app.get('/load/:title', (req, res) => {
  const normalizedTitle = normalizeTitle(req.params.title);

  Content.findOne({ title: normalizedTitle })
    .then(content => {
      if (!content) {
        return res.status(404).json({ error: 'No content found' });
      }
      res.json({ content: content.content });
    })
    .catch(err => {
      console.error('Error loading content:', err);
      res.status(500).json({ error: 'Error loading content' });
    });
});

app.get('/files', (req, res) => {
  Content.find({}, 'title')
    .then(files => {
      res.json(files);
    })
    .catch(err => {
      console.error('Error loading files:', err);
      res.status(500).json({ error: 'Error loading files' });
    });
});

app.delete('/delete/:title', (req, res) => {
  const normalizedTitle = normalizeTitle(req.params.title);

  Content.findOneAndDelete({ title: normalizedTitle })
    .then(deletedContent => {
      if (!deletedContent) {
        return res.status(404).json({ error: 'No content found to delete' });
      }
      res.json({ message: 'Content deleted successfully!', deletedContent });
    })
    .catch(err => {
      console.error('Error deleting content:', err);
      res.status(500).json({ error: 'Error deleting content' });
    });
});

app.put('/update/:title', (req, res) => {
  const normalizedTitle = normalizeTitle(req.params.title);
  const { content } = req.body;

  Content.findOneAndUpdate({ title: normalizedTitle }, { content }, { new: true })
    .then(updatedContent => {
      if (!updatedContent) {
        return res.status(404).json({ error: 'No content found to update' });
      }
      res.json({ message: 'Content updated successfully!', updatedContent });
    })
    .catch(err => {
      console.error('Error updating content:', err);
      res.status(500).json({ error: 'Error updating content' });
    });
});

// Upload endpoint for multiple files
app.post('/upload', upload.array('files', 10), (req, res) => { // allow up to 10 files
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const files = req.files.map(file => ({
    docId: file.filename,
    url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
  }));

  res.json({ files });
});

// Download endpoint
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


