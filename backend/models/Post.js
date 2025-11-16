import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Shop/Cafe Information
        storeName: {
            type: String,
            required: [true, "Please provide a store name"],
            trim: true,
        },
        storeLocation: {
            address: String,
            city: String,
            state: String,
            zipCode: String,
        },
        // Product Information
        productName: {
            type: String,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        matchaType: {
            type: String,
            enum: ["ceremonial", "culinary", "premium", "latte-grade", "other"],
            default: "other",
        },
        origin: {
            type: String,
            trim: true, // e.g., "Uji, Japan", "Nishio, Japan"
        },
        priceRange: {
            type: String,
            enum: ["$", "$$", "$$$", "$$$$", ""],
            default: "",
        },
        // Review Content
        reviewText: {
            type: String,
            required: [true, "Please provide review text"],
            maxlength: [2000, "Review text must be less than 2000 characters"],
        },
        // Rating System
        overallRating: {
            type: Number,
            required: [true, "Please provide an overall rating"],
            min: 1,
            max: 5,
        },
        detailedRatings: {
            taste: {
                type: Number,
                min: 1,
                max: 5,
            },
            texture: {
                type: Number,
                min: 1,
                max: 5,
            },
            bitterness: {
                type: Number,
                min: 1,
                max: 5,
            },
            sweetness: {
                type: Number,
                min: 1,
                max: 5,
            },
        },
        // Images
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                caption: {
                    type: String,
                    default: "",
                },
            },
        ],
        // Tags/Flavor Notes
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        flavorNotes: [
            {
                type: String,
                enum: [
                    "earthy",
                    "grassy",
                    "umami",
                    "sweet",
                    "bitter",
                    "creamy",
                    "smooth",
                    "nutty",
                    "vegetal",
                    "fresh",
                    "rich",
                    "delicate",
                ],
            },
        ],
        // Engagement
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        likesCount: {
            type: Number,
            default: 0,
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for better query performance
postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ storeName: 1 });
postSchema.index({ createdAt: -1 });

export default mongoose.model("Post", postSchema);

