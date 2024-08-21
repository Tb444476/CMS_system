// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const bcrypt = require('bcryptjs');

// const { check, validationResult } = require('express-validator');

// const jwt = require('jsonwebtoken');
// const { Schema, model } = mongoose;
// // const nodemailer = require('nodemailer');

// const fs = require('fs');

// const PORT = 5000;
// const JWT_SECRET = 'my-32-character-ultra-secure-and-ultra-long-secret';
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const clientid = "995960897757-kc1qja0uupsnhdvusohls4v5cipqqc87.apps.googleusercontent.com";
// const clientsecret = "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";

// const nodemailer = require('nodemailer');

// // const User = require('./models/user');  // You'll need to create this User model
// const Content = require('./models/content');
// const app = express();
// // const port = 5000;


// // MongoDB connection
// mongoose.connect('mongodb+srv://tejas_Bhame:Tejas%231234@cluster0.78fhj3m.mongodb.net/suneditor?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000, // 30 seconds
//   socketTimeoutMS: 30000 // 30 seconds
// })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB Atlas', err);
//   });

// // Middleware
// app.use(cors());
// app.use(bodyParser.json({ limit: '500mb' }));
// app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// app.use(express.static('uploads'));

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });



// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   employeeId: String,
//   disabled: { type: Boolean, default: false },
//   description: String,
//   profilePic: { type: String },
//   verified: {type: Boolean, default: false}
// });



// const User = mongoose.model('User', userSchema)

// app.use(bodyParser.json());


// app.use(cors({origin: true, credentials:true}));
// app.use(cookieParser());



// //Setup session
// app.use(session({
//   secret: "12345ASDF",
//   resave:false,
//   saveUninitialized:true,
//   cookie: {
//     secure: false, //Set it to true if using HTTPS
//     httpOnly: false,
//   }
// }));


// //setup passport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new OAuth2Strategy({
//     clientID: clientid,
//     clientSecret:clientsecret,
//     callbackURL: "/auth/google/callback",
//     scope:["profile", "email"],
//   },
//   async(accessToken,refreshToken,profile,done) => {
//     try {
      
//       let comment = await CommentModel.findOne({googleId: profile.id});

//       if(!comment) {
//         comment = new CommentModel({
//           googleId: profile.id,
//           displayName: profile.name.givenName + ' ' + profile.name.familyName,
//           email: profile.emails[0].value,
//           image: profile.photos[0].value,
//         });
        
//         await comment.save();
        
//       }
//       return done(null, comment);
//     } catch(error) {
//       console.error("Error during authentication:", error); // Log any errors that occur

//       return done(error, null);
//     }
//   }
//   )
// )

// passport.serializeUser((user, done) => {
//   done(null,user.googleId);
// });


// passport.deserializeUser(async (googleId, done) => {
//   try {
    

//     // Find the user in the database using the provided Google Id
//     const user = await CommentModel.findOne({ googleId });
//     if (!user) {
//       console.error("User not found for Google ID:", googleId);
//       return done(new Error('User not found'));
//     }

    

//     // Pass the user object to the next middleware or route handler
//     done(null, user);
//   } catch(error) {
//     console.error("Error during deserialization:", error);
//     done(error, null);
//   }
// });




// // initial google ouath login
// app.get("/auth/google", (req, res, next) => {
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     // Append prompt parameter to force account selection
//     prompt: "select_account",
//   })(req, res, next);
// });
// app.get("/auth/google/callback",passport.authenticate("google",{
//     successRedirect:"/login/success",
//     failureRedirect:"/google-login"
// }))

// app.get("/login/success", (req, res) => {
//   if(req.user) {
    
//     //Set authenticated cookie
//     res.cookie("authenticated", "true", {
//       httpOnly: false,
//       secure: false,
//     });
//     res.cookie("displayName", req.user.displayName, {
//       httpOnly: false,
//       secure: false,
//     });
//     res.cookie("email", req.user.email, {
//       httpOnly: false,
//       secure: false,
//     });
//     res.cookie("image", req.user.image, {
//       httpOnly: false,
//       secure: false,
//     });
//     res.redirect("http://localhost:3000/blogs");
//   } else {
    
//     res.status(401).json({message: "User not authenticated"});
//   }
// });

// // Express route for handling logout
// app.get("/logout", (req, res) => {
//   // Destroy the session
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error destroying session:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       // Clear the user authentication status
//       res.clearCookie("authenticated");
//       res.clearCookie("displayName");
//       res.clearCookie("email");
//       res.clearCookie("image");
//       res.redirect("http://localhost:3000");
      
//     }
//   });
// });

// // Endpoint to create a new header

// app.post('/header', async (req, res) => {
//   try {
//     const { image } = req.body;
//     const newHeader = new PostModel2({image});
//     const savedHeader = await newHeader.save();
//     res.status(200).json(savedHeader);
//   } catch (error) {
//     console.error('Error creating header:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/header-data', async (req, res) => {
//   try {
//     const headerData = await PostModel2.find();
//     res.json(headerData);
//   } catch (error) {
//     console.error('Error fetching header:', error);
//     res.status(500).json({ error: 'Error fetching header' });
//   }
// });
// //Endpoint to get users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to disable a user by ID (for superadmin)
// app.put('/users/:id/disable', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { disabled: true },
//       { new: true }
//     );
//     if (updatedUser) {
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error disabling user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to enable a user by ID (for superadmin)
// app.put('/users/:id/enable', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { disabled: false },
//       { new: true }
//     );
//     if (updatedUser) {
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error disabling user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// //Endpoint to post blogs
// app.post('/blogs', async (req, res) => {
//   try {
//     const { title, summary, content, image, category,author, status } = req.body;
//     const newBlog = new BlogModel({title, summary, content, image, category, author, status });
//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     res.status(500).json('Internal Server Error');
//   }
// });
// //Endpoint to get all blogs 
// app.get('/blogs', async (req, res) => {
//   try {
//     const { authorEmail } = req.query;

//     // If authorEmail is provided, fetch blogs by author's email
//     if (authorEmail) {
//       const blogs = await BlogModel.find({ 'author.email': authorEmail });
//       res.json(blogs);
//     } else {
//       // If authorEmail is not provided, fetch all blogs
//       const blogs = await BlogModel.find();
//       res.json(blogs);
//     }
//   } catch (error) {
//     console.error('Error fetching blogs data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// //Endpoint to get blogs by id
// app.get('/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await BlogModel.findById(id);

//     if (blog) {
//       res.json(blog);
//     } else {
//       res.status(404).json({ error: 'Blog not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// //Endpoint to get categories
// app.get('/categories', async (req, res) => {
//   try {
//     const categories = await BlogModel.distinct('category');

//     if (categories.length > 0) {
//       res.json(categories);
//     } else {
//       res.status(404).json({ error: 'No categories found' });
//     }
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // Endpoint to update a specific blog based on _id
// app.put('/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, summary, content, image, category } = req.body;

//     const updatedBlog = await BlogModel.findByIdAndUpdate(
//       id,
//       { title, summary, content, image, category },
//       { new: true }
//     );

//     if (updatedBlog) {
//       res.status(200).json(updatedBlog);
//     } else {
//       res.status(404).json({ error: 'Blog not found' });
//     }
//   } catch (error) {
//     console.error('Error updating blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// //Endpoint to delete blogs
// app.delete('/blogs/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedPage = await BlogModel.findByIdAndDelete(id);

//     if (deletedPage) {
//       res.status(200).json(deletedPage);
//     } else {
//       res.status(404).json({ error: 'Page not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting page:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // Endpoint to register new admin
// app.post('/register', async (req, res) => {
//   const { name, email, password, employeeId } = req.body;

//   // Check if the user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ error: 'User already exists' });
//   }

//   //Generate verification token
//   const verificationToken = jwt.sign({email, employeeId}, JWT_SECRET, {expiresIn: '6m'});
 
//   // Create a new user
//   const newUser = new User({
//     name,
//     email,
//     password,
//     employeeId,
//   });

//   try {
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//     const verificationLink = `http://localhost:5000/verify/${email}/${verificationToken}`;
    
//     //Send verification link via email usin nodemailer
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       port: 465,
//       secure: true,
//       secureConnection: false,
//       auth: {
//         user: 'tejasbhame444476@gmail.com',


//         pass: 'mjisxiasiervrrwz',
//       },
//     });

//     const mailOptions = {
//       from: 'tejasbhame444476@gmail.com' ,
//       to: email,
//       subject: 'Account Verification',
//       html: `<p>Please click <a href="${verificationLink}">here</a> to verify your account.</p>`,
//     };

//     transporter.sendMail(mailOptions, function (error, info){
//       if (error) {
//         console.error(error);
//         return res.status(500).json({error: 'Error sending email'});
//       } else {
        
//         res.status(201).json({message: 'Email verification link sent.'});
//       }
//     });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// //Verification endpoint
// app.get('/verify/:email/:token', async (req, res) => {
//   const { email, token } = req.params;
//   try{
//     // Find the user with the given email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({error: 'User not found'});
//     }
    
//     //Verify the token
//     jwt.verify(token, JWT_SECRET, async (err,decoded) => {
//       if (err) {
//         return res.status(401).json({error: 'Invalid verification token'});
//       }

//       //Verify that the decoded email and employeeId match the user's data
//       if (decoded.email !== email || decoded.employeeId !== user.employeeId){
//         return res.status(401).json({error: 'Invalid verification token data'});
//       }

//       //Update the user's verification status
//       user.verified = true;
//       await user.save();
      
//       //Send Success message
//       res.status(200).send('Email verified successfully.You may safely close this tab');
//     });
//   } catch (error) {
//     console.error('Error verifying account:', error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });

// //Endpoint for admin login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Incorrect password' });
//     }

//     if (user.disabled) {
//       return res.status(401).json({ error: 'Your account is disabled. Please contact the administrator.' });
//     }

//     if (!user.verified) {
//       return res.status(401).json({ error: 'Account not verified.' });
//     }

//     const accessToken = jwt.sign({ email: user.email, name: user.name  }, JWT_SECRET, { expiresIn: '1h' });

//     // Send user's name along with other data in response
//     res.status(200).json({ message: 'Login successful', accessToken, name: user.name, email: user.email });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.post('/refresh-token', async (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ error: 'Refresh token required' });
//   }

//   try {
//     // Verify refresh token
//     const decoded = jwt.verify(refreshToken, JWT_SECRET);

//     // Generate new access token
//     const accessToken = jwt.sign({ email: decoded.email, name: decoded.name }, JWT_SECRET, { expiresIn: '1h' });

//     // Include email and name in the response
//     res.json({ accessToken, email: decoded.email, name: decoded.name });
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid refresh token' });
//   }
// });


// // Endpoint to approve a pending blog post (for superadmin)
// app.put('/blogs/approve/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBlog = await BlogModel.findByIdAndUpdate(
//       id,
//       { status: 'approved' },
//       { new: true }
//     );
//     if (updatedBlog) {
//       res.status(200).json(updatedBlog);
//     } else {
//       res.status(404).json({ error: 'Blog not found' });
//     }
//   } catch (error) {
//     console.error('Error approving blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to reject a pending blog post (for superadmin)
// app.put('/blogs/reject/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBlog = await BlogModel.findByIdAndUpdate(
//       id,
//       { status: 'rejected' },
//       { new: true }
//     );
//     if (updatedBlog) {
//       res.status(200).json(updatedBlog);
//     } else {
//       res.status(404).json({ error: 'Blog not found' });
//     }
//   } catch (error) {
//     console.error('Error rejecting blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to fetch all pending blog posts (for superadmin)
// app.get('/pending', async (req, res) => {
//   try {
//     const pendingBlogs = await BlogModel.find({ status: 'pending' });
//     res.json(pendingBlogs);
//   } catch (error) {
//     console.error('Error fetching pending blogs:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint for superadmin login
// app.post('/superadmin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the email domain is allowed for superadmins
//     if (!isValidEmail(email)) {
//       return res.status(401).json({ error: 'Not authorized' });
//     }

//     // Authenticate superadmin user
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate access token
//     const accessToken = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

//     // Generate refresh token
//     const refreshToken = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET);

//     res.status(200).json({ accessToken, refreshToken });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Function to check if the email domain is allowed for superadmins
// function isValidEmail(email) {
//   const allowedDomain = 'pranav.bhujbal@walsystems.in';
//   const domain = email
//   return domain === allowedDomain;
// }

// // Endpoint to add a new comment to a blog post
// app.post('/blogs/:id/comments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { text } = req.body;
    
//     // Find the blog post by ID
//     const blog = await BlogModel.findById(id);
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }
    
//     // Get user details from the session
//     const { displayName, image, email } = req.cookies;
    
//     // Add the new comment to the blog post with user details
//     blog.comments.push({ text, displayName, email, image });
    
//     // Save the updated blog post
//     const updatedBlog = await blog.save();
//     res.status(201).json(updatedBlog);
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to fetch all comments for a specific blog post
// app.get('/blogs/:id/comments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Find the blog post by ID and populate the comments field
//     const blog = await BlogModel.findById(id).select('comments');
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }
//     res.json(blog.comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to delete a comment by ID
// app.delete('/comments/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await BlogModel.findOne({ 'comments._id': id });
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }
//     blog.comments.pull(id);
//     const updatedBlog = await blog.save();
//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to fetch user details by email
// app.get('/users/:email', async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await User.findOne({ email });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to update user details
// app.put('/users/:id', async (req, res) => {
//   const userId = req.params.id;
//   const updatedUserData = req.body;

//   try {
//     // Find the user by ID and update their details
//     const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     // Return the updated user data in the response
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint to upload profile picture
// app.post('/users/:id/profile-pic', upload.single('profilePic'), async (req, res) => {
//   const userId = req.params.id;

//   // Check if a file was uploaded
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // File was uploaded, get the path
//   const profilePicPath = req.file.path;

//   try {
//     // Update user document with the profile picture path
//     await User.findByIdAndUpdate(userId, { profilePic: profilePicPath });

//     res.status(200).json({ message: 'Profile picture uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading profile picture', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// // Endpoint api for Forgot Password
// app.post('/forgot-password', async (req,res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(404).json({error: 'User not found'});
//     }

//     //Generate reset token
//     const token = jwt.sign({ email: user.email, random: generateRandomString() }, JWT_SECRET, {expiresIn: '6m'});


//     const resetLink = `http://localhost:3000/reset-password/${token}`;
    

//     // Send reset link via email using nodemailer
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       port: 465,
//       secure: true,
//       secureConnection: false,
//       auth: {
//         user: 'bestowalsystems1@gmail.com',
//         pass: 'oitnmxsxhkrxgwkr',
//       },
//     });

//     const mailOptions = {
//       from: 'bestowalsystems1@gmail.com',
//       to: user.email,
//       subject: 'Password Reset',
//       html: `<p>Please click <a href="${resetLink}">here</a> to reset your password.</p>`
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({error: 'Error sending email'});
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

//     res.status(200).json({message: 'Reset link sent successfully'});
//   }catch (error) {
//     console.error('Error generating reset token', error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });

// //Function to generate a random string
// function generateRandomString() {
//   return Math.random().toString(36).substring(2, 15);
// }

// //Reset Password endpoint
// app.get("/reset-password/:token", async (req, res) => {
//   const {token} = req.params;

//   try {
//     //Verify the token
//     const verify = jwt.verify(token, JWT_SECRET);

//     if(!isValidResetToken(verify)){
//       console.error("Invalid Token Structure");
//       return res.status(400).json({error: "Invalid Token Structure"});
//     }
  
//   } catch (error) {
//     console.error("Error verifying reset password token:", error);
//     res.status(500).json({error: "Failed to verify token"});
//   }
// });

// function isValidResetToken(decodedToken){
//   return decodedToken && decodedToken.email && decodedToken.random && decodedToken.exp;
// }

// app.post("/reset-password/:token", async (req, res) => {
//   const {token} = req.params;
//   const {password} = req.body;

//   try {
//     const decodedToken = jwt.verify(token, JWT_SECRET);

//     const user = await User.findOne({ email: decodedToken.email });
    
//     if (!user) {
//       return res.status(404).json({error: 'User not found'});
//     }

//     user.password = password;
//     await user.save();

//     res.status(200).json({message: "Password reset successfully"});
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(500).json({error: "Something Went Wrong"});
//   }
// });

// // Endpoint to fetch approved blogs
// app.get('/approved-blogs', async (req, res) => {
//   try {
//     const approvedBlogs = await BlogModel.find({ status: 'approved' });
//     res.json(approvedBlogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });







// // (Keep your existing content management routes but add authMiddleware where necessary)


// // Content Management Routes
// const normalizeTitle = (title) => title.trim().toLowerCase();

// app.post('/save', (req, res) => {
//   const { title, content } = req.body;
//   const normalizedTitle = normalizeTitle(title);

//   Content.findOneAndUpdate({ title: normalizedTitle }, { content }, { upsert: true, new: true })
//     .then(savedContent => {
//       console.log('Content saved successfully:', savedContent);
//       res.json({ message: 'Content saved successfully!', savedContent });
//     })
//     .catch(err => {
//       console.error('Error saving content:', err);
//       res.status(500).json({ error: 'Error saving content' });
//     });
// });

// app.get('/load/:title', (req, res) => {
//   const normalizedTitle = normalizeTitle(req.params.title);

//   Content.findOne({ title: normalizedTitle })
//     .then(content => {
//       if (!content) {
//         return res.status(404).json({ error: 'No content found' });
//       }
//       res.json({ content: content.content });
//     })
//     .catch(err => {
//       console.error('Error loading content:', err);
//       res.status(500).json({ error: 'Error loading content' });
//     });
// });

// app.get('/files', (req, res) => {
//   Content.find({}, 'title')
//     .then(files => {
//       res.json(files);
//     })
//     .catch(err => {
//       console.error('Error loading files:', err);
//       res.status(500).json({ error: 'Error loading files' });
//     });
// });

// app.delete('/delete/:title', (req, res) => {
//   const normalizedTitle = normalizeTitle(req.params.title);

//   Content.findOneAndDelete({ title: normalizedTitle })
//     .then(deletedContent => {
//       if (!deletedContent) {
//         return res.status(404).json({ error: 'No content found to delete' });
//       }
//       res.json({ message: 'Content deleted successfully!', deletedContent });
//     })
//     .catch(err => {
//       console.error('Error deleting content:', err);
//       res.status(500).json({ error: 'Error deleting content' });
//     });
// });

// app.put('/update/:title', (req, res) => {
//   const normalizedTitle = normalizeTitle(req.params.title);
//   const { content } = req.body;

//   Content.findOneAndUpdate({ title: normalizedTitle }, { content }, { new: true })
//     .then(updatedContent => {
//       if (!updatedContent) {
//         return res.status(404).json({ error: 'No content found to update' });
//       }
//       res.json({ message: 'Content updated successfully!', updatedContent });
//     })
//     .catch(err => {
//       console.error('Error updating content:', err);
//       res.status(500).json({ error: 'Error updating content' });
//     });
// });

// // Upload endpoint for multiple files
// app.post('/upload', upload.array('files', 10), (req, res) => { // allow up to 10 files
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).send('No files uploaded.');
//   }

//   const files = req.files.map(file => ({
//     docId: file.filename,
//     url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
//   }));

//   res.json({ files });
// });

// // Download endpoint
// app.get('/uploads/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'uploads', filename);
//   res.sendFile(filePath);
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Content = require('./models/content');
const crypto = require('crypto');
// const User = require('./models/user'); // Add this model
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://tejas_Bhame:Tejas%231234@cluster0.78fhj3m.mongodb.net/suneditor?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000
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

// User model

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }, // New field
  employeeId: { type: String, required: true }, // New field
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetToken: { type: String }
});

const User = mongoose.model('User', userSchema);

// JWT secret
const JWT_SECRET = 'my-32-character-ultra-secure-and-ultra-long-secret';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tejasbhame444476@gmail.com',


     pass: 'mjisxiasiervrrwz'
  }
});

// Registration route

app.post('/register', async (req, res) => {
  const { email, password, name, employeeId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    const user = new User({ email, password: hashedPassword, name, employeeId, verificationToken });
    await user.save();

    const verificationUrl = `http://localhost:5000/verify-email/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="${verificationUrl}">here</a> to verify your email.`
    });

    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});


// Email verification route
app.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (user && user.verificationToken === token) {
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
      res.send('Email verified successfully. You can now log in.');
    } else {
      res.status(400).send('Invalid or expired token.');
    }
  } catch (err) {
    res.status(500).send('Error verifying email.');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(400).json({ error: 'Invalid email or email not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});


// Forgot password route
// Forgot password route
// Forgot password route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User with this email does not exist' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.`
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ error: 'Error sending reset link' });
  }
});

// Reset password route
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null; // Clear the reset token after successful reset
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error resetting password' });
  }
});


// Content Management Routes
const normalizeTitle = (title) => title.trim().toLowerCase();

app.post('/save',(req, res) => {
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
app.post('/upload', upload.array('files', 10), (req, res) => {
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
