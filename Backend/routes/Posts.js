const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

const router = express.Router();

// Create a new post with image upload
router.post("/create", upload.single('image'), async (req, res) => {
  try {
    const { title, caption } = req.body;

    // Validate required fields
    if (!title || !caption || !req.file) {
      return res.status(400).json({ message: "Title, caption, and image are required" });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({ error: "Cloudinary not configured. Please check your .env file." });
    }

    // Upload image to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'paint-io',
          transformation: [
            { width: 800, height: 600, crop: 'limit' } // Resize large images
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image'));
          } else {
            resolve(result);
          }
        }
      );
      
      uploadStream.end(req.file.buffer);
    });

    const result = await uploadPromise;

    // Create new post with Cloudinary URL
    const newPost = new Post({
      title,
      caption,
      imageUrl: result.secure_url
    });

    await newPost.save();

    res.status(201).json({ 
      message: "Post created successfully", 
      post: newPost 
    });

  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Get all posts
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({ posts });
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (err) {
    console.error("Get post error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});





// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router; 