const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/user");
require("dotenv").config();

// Sample posts data
const samplePosts = [
  {
    title: "Sunset Dreams",
    caption: "A beautiful sunset painting inspired by nature's colors",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop",
    author: null // Will be set after finding a user
  },
  {
    title: "Abstract Harmony",
    caption: "Exploring the balance between chaos and order in abstract art",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=600&fit=crop",
    author: null
  },
  {
    title: "Digital Landscape",
    caption: "A futuristic cityscape created with digital tools",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=600&fit=crop",
    author: null
  },
  {
    title: "Watercolor Memories",
    caption: "Soft watercolor techniques bringing memories to life",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
    author: null
  },
  {
    title: "Minimalist Design",
    caption: "Less is more - exploring minimalist art principles",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop",
    author: null
  },
  {
    title: "Color Theory",
    caption: "Experimenting with complementary colors and their interactions",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=500&h=600&fit=crop",
    author: null
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.Mongo_url);
    console.log("Connected to MongoDB again");

    // Find a user to assign as author
    const user = await User.findOne();
    if (!user) {
      console.log("No users found. Please create a user first.");
      return;
    }

    console.log(`Using user: ${user.firstname} ${user.lastname}`);

    // Clear existing posts
    await Post.deleteMany({});
    console.log("Cleared existing posts");

    // Create sample posts
    const postsWithAuthor = samplePosts.map(post => ({
      ...post,
      author: user._id
    }));

    const createdPosts = await Post.insertMany(postsWithAuthor);
    console.log(`Created ${createdPosts.length} sample posts`);

    console.log("Sample data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

// Run the seed function
seedData(); 