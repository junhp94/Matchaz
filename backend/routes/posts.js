import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username avatarUrl")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("user", "username avatarUrl");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post("/", protect, async (req, res) => {
    try {
        const {
            storeName,
            storeLocation,
            productName,
            brand,
            matchaType,
            origin,
            priceRange,
            reviewText,
            overallRating,
            detailedRatings,
            images,
            tags,
            flavorNotes,
        } = req.body;

        if (!storeName || !reviewText || !overallRating) {
            return res.status(400).json({ message: "Please provide store name, review text, and rating" });
        }

        const post = await Post.create({
            user: req.user._id,
            storeName,
            storeLocation: storeLocation || {},
            productName: productName || "",
            brand: brand || "",
            matchaType: matchaType || "other",
            origin: origin || "",
            priceRange: priceRange || "",
            reviewText,
            overallRating,
            detailedRatings: detailedRatings || {},
            images: images || [],
            tags: tags || [],
            flavorNotes: flavorNotes || [],
        });

        const populatedPost = await Post.findById(post._id).populate("user", "username avatarUrl");

        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put("/:id", protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user owns the post
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate("user", "username avatarUrl");

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user owns the post
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this post" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/posts/:id/like
// @desc    Like/Unlike a post
// @access  Private
router.put("/:id/like", protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = post.likes.includes(req.user._id);

        if (isLiked) {
            // Unlike
            post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
            post.likesCount = Math.max(0, post.likesCount - 1);
        } else {
            // Like
            post.likes.push(req.user._id);
            post.likesCount += 1;
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

