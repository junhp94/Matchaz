# Matcha Social - Matcha Lovers Review & Social Network

A social networking platform designed for matcha enthusiasts to share reviews, discover new matcha products and cafes, and connect with fellow matcha lovers.

## 🌿 About

Matcha Social is a full-stack web application that combines the best of review platforms and social networking. Users can create detailed reviews of matcha products and cafes, share photos, rate their experiences, and interact with other matcha enthusiasts in the community.

## ✨ Features

### Enhanced Reviews
- **Store Information**: Review cafes and shops with location details
- **Product Details**: Document matcha products with brand, type, origin, and price range
- **Detailed Ratings**: Rate overall experience plus specific aspects (taste, texture, bitterness, sweetness)
- **Multiple Photos**: Upload and display multiple images per review
- **Tags & Flavor Notes**: Add custom tags and select from predefined flavor notes (earthy, grassy, umami, creamy, etc.)
- **Rich Content**: Comprehensive review text with all matcha-specific details

### Social Features
- **User Authentication**: Secure registration and login system
- **User Profiles**: Personal profiles with avatars and bios
- **Like System**: Like and interact with reviews
- **Feed**: Browse latest reviews from the community
- **Responsive Design**: Beautiful, modern UI that works on all devices

### Current Implementation Status
✅ User authentication (register, login)  
✅ Enhanced review creation with all product details  
✅ Review feed with detailed post cards  
✅ Like/unlike functionality  
✅ Multiple image support with carousel  
✅ Tags and flavor notes  
✅ Detailed rating system  

### Planned Features
🔄 User profiles and follow system  
🔄 Comments and replies  
🔄 Search and filtering  
🔄 Collections and bookmarks  
🔄 Recommendations based on preferences  
🔄 Location-based discovery  
🔄 Notifications  

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd matchaz
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/matchaz
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
```

**Note**: For production, use a strong random string for `JWT_SECRET` and a secure MongoDB connection string.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system. If using a local installation:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas cloud database
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
matchaz/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Post.js              # Post/Review model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── posts.js             # Post/Review routes
│   ├── server.js                # Express server setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosClient.js   # API client configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── PostCard.jsx     # Review card component
│   │   │   └── ShopsBar.jsx     # Shops/stories bar
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Main feed page
│   │   │   ├── LoginPage.jsx    # Login page
│   │   │   ├── RegisterPage.jsx # Registration page
│   │   │   └── CreatePostPage.jsx # Create review page
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   └── package.json
│
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts/Reviews
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create a new post (protected)
- `PUT /api/posts/:id` - Update a post (protected, owner only)
- `DELETE /api/posts/:id` - Delete a post (protected, owner only)
- `PUT /api/posts/:id/like` - Like/unlike a post (protected)

## 🎨 Features in Detail

### Review Creation
When creating a review, users can provide:
- **Store Information**: Name, address, city, state, ZIP code
- **Product Details**: Product name, brand, matcha type (ceremonial, culinary, premium, latte-grade), origin, price range
- **Ratings**: Overall rating (1-5 stars) plus detailed ratings for taste, texture, bitterness, and sweetness
- **Content**: Review text, multiple photos, custom tags, and flavor notes
- **Flavor Notes**: Select from options like earthy, grassy, umami, sweet, bitter, creamy, smooth, nutty, vegetal, fresh, rich, delicate

### Review Display
Each review card shows:
- User information with avatar
- Image carousel for multiple photos
- Store and product information
- All ratings (overall and detailed)
- Location information
- Tags and flavor notes
- Like count and interaction buttons

## 🚧 Development Roadmap

The following features are planned for future releases:

1. **User Profiles & Follow System**
   - Detailed user profiles
   - Follow/unfollow users
   - Personalized feed based on following

2. **Comments & Interactions**
   - Comment on reviews
   - Reply to comments
   - Share reviews

3. **Search & Discovery**
   - Search reviews, shops, and users
   - Filter by location, rating, matcha type
   - Advanced search with multiple criteria

4. **Collections & Bookmarks**
   - Save favorite reviews
   - Create custom collections
   - Public and private lists

5. **Recommendations**
   - Personalized recommendations
   - Similar products/shops
   - Based on user preferences and ratings

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📝 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built with love for the matcha community! 🍵

---

**Note**: This is an active development project. Features are being added incrementally. Check back regularly for updates!

