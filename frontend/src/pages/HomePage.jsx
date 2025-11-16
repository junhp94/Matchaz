import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import PostCard from "../components/PostCard";
import ShopsBar from "../components/ShopsBar";

export default function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPosts() {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
      // Fallback to dummy data for development
      setPosts([
        {
          _id: 1,
          storeName: "Matcha Cafe Maiko",
          overallRating: 5,
          reviewText: "Super creamy! Authentic Japanese matcha flavor.",
          images: [{ url: "/dummy-matcha.jpg" }],
          user: { username: "jun" },
        },
        {
          _id: 2,
          storeName: "Starbucks",
          overallRating: 4,
          reviewText: "Sweet and creamy. Good for beginners.",
          images: [{ url: "/dummy2.jpg" }],
          user: { username: "alex" },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto pb-20">
      {/* ShopsBar (stories) */}
      <ShopsBar />

      {/* Feed title */}
      <h1 className="text-xl font-bold px-4 mt-4 mb-2 text-green-800">
        Latest Reviews
      </h1>

      {/* Loading state */}
      {loading && (
        <div className="px-4 text-center py-8 text-gray-500">Loading reviews...</div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="px-4 text-center py-8 text-red-500">{error}</div>
      )}

      {/* Posts feed */}
      <div className="px-4">
        {!loading && posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to post one!
          </div>
        )}
        {posts.map((post) => (
          <PostCard key={post._id || post.id} post={post} />
        ))}
      </div>

      {/* Floating create button */}
      <button
        onClick={() => navigate("/create")}
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-green-700 text-3xl flex items-center justify-center z-10"
      >
        +
      </button>
    </div>
  );
}
