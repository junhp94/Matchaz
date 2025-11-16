import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { AuthContext } from "../contexts/AuthContext";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(
    user && post.likes ? post.likes.includes(user._id || user.id) : false
  );
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = post.images && post.images.length > 0 ? post.images : [{ url: post.imageUrl || "/dummy-matcha.jpg" }];

  async function handleLike() {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.put(`/posts/${post._id || post.id}/like`);
      setIsLiked(res.data.likes.includes(user._id || user.id));
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.error(err);
    }
  }

  function handlePrevImage() {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNextImage() {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="bg-white shadow-sm rounded-xl mb-6 p-3">
      {/* User info */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
          {post.user?.avatarUrl ? (
            <img
              src={post.user.avatarUrl}
              alt={post.user.username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-green-700 font-semibold">
              {post.user?.username?.[0]?.toUpperCase() || "U"}
            </span>
          )}
        </div>
        <p className="font-semibold">@{post.user?.username || post.username}</p>
      </div>

      {/* Post images with carousel */}
      <div className="relative mt-3">
        <img
          src={images[currentImageIndex]?.url || "/dummy-matcha.jpg"}
          alt="matcha"
          className="w-full h-72 object-cover rounded-lg"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 px-1">
        {/* Ratings */}
        <div className="flex items-center gap-2 mb-2">
          <p className="text-green-700 font-medium">⭐ {post.overallRating || post.rating}/5</p>
          {post.detailedRatings && (
            <div className="flex gap-2 text-xs text-gray-600">
              {post.detailedRatings.taste && <span>Taste: {post.detailedRatings.taste}/5</span>}
              {post.detailedRatings.texture && (
                <span>Texture: {post.detailedRatings.texture}/5</span>
              )}
            </div>
          )}
        </div>

        {/* Store and Product Info */}
        <h2 className="font-semibold text-lg">{post.storeName}</h2>
        {post.productName && (
          <p className="text-gray-600 text-sm">{post.productName}</p>
        )}
        {post.brand && <p className="text-gray-600 text-sm">Brand: {post.brand}</p>}
        {post.matchaType && (
          <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mt-1">
            {post.matchaType}
          </span>
        )}
        {post.origin && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-1 ml-1">
            {post.origin}
          </span>
        )}
        {post.priceRange && (
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full mt-1 ml-1">
            {post.priceRange}
          </span>
        )}

        {/* Location */}
        {post.storeLocation?.city && (
          <p className="text-gray-500 text-sm mt-1">
            📍 {post.storeLocation.city}
            {post.storeLocation.state && `, ${post.storeLocation.state}`}
          </p>
        )}

        {/* Review Text */}
        <p className="text-gray-800 mt-2">{post.reviewText}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Flavor Notes */}
        {post.flavorNotes && post.flavorNotes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.flavorNotes.map((note, index) => (
              <span
                key={index}
                className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200"
              >
                {note}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${isLiked ? "text-red-500" : "text-gray-500"
              } hover:text-red-500`}
          >
            <span className="text-xl">{isLiked ? "❤️" : "🤍"}</span>
            <span>{likesCount}</span>
          </button>
          <button className="text-gray-500 hover:text-green-600 flex items-center gap-2">
            <span>💬</span>
            <span>{post.commentsCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
