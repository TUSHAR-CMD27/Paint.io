const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  caption: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  imageUrl: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema); 