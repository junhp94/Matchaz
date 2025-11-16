import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { AuthContext } from "../contexts/AuthContext";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    storeName: "",
    storeLocation: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    productName: "",
    brand: "",
    matchaType: "other",
    origin: "",
    priceRange: "",
    reviewText: "",
    overallRating: 5,
    detailedRatings: {
      taste: 5,
      texture: 5,
      bitterness: 3,
      sweetness: 3,
    },
    tags: [],
    flavorNotes: [],
  });
  const [tagInput, setTagInput] = useState("");

  const flavorNoteOptions = [
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
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("storeLocation.")) {
      const locationField = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        storeLocation: {
          ...prev.storeLocation,
          [locationField]: value,
        },
      }));
    } else if (name.startsWith("detailedRatings.")) {
      const ratingField = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        detailedRatings: {
          ...prev.detailedRatings,
          [ratingField]: parseInt(value),
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleAddTag() {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  }

  function handleRemoveTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  function handleToggleFlavorNote(note) {
    setForm((prev) => ({
      ...prev,
      flavorNotes: prev.flavorNotes.includes(note)
        ? prev.flavorNotes.filter((n) => n !== note)
        : [...prev.flavorNotes, note],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      alert("Please login to create a review");
      navigate("/login");
      return;
    }

    if (!form.storeName || !form.reviewText) {
      alert("Please fill in store name and review text");
      return;
    }

    setLoading(true);
    try {
      await api.post("/posts", form);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white shadow rounded-xl mb-20">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Create Review</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Store Information */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold text-green-800 mb-3">Store Information</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="storeName"
              placeholder="Store name *"
              value={form.storeName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              name="storeLocation.address"
              placeholder="Address"
              value={form.storeLocation.address}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                name="storeLocation.city"
                placeholder="City"
                value={form.storeLocation.city}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                name="storeLocation.state"
                placeholder="State"
                value={form.storeLocation.state}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                name="storeLocation.zipCode"
                placeholder="ZIP Code"
                value={form.storeLocation.zipCode}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold text-green-800 mb-3">Product Information</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="productName"
              placeholder="Product name (optional)"
              value={form.productName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand (optional)"
              value={form.brand}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
            <select
              name="matchaType"
              value={form.matchaType}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option value="ceremonial">Ceremonial</option>
              <option value="culinary">Culinary</option>
              <option value="premium">Premium</option>
              <option value="latte-grade">Latte Grade</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              name="origin"
              placeholder="Origin (e.g., Uji, Japan)"
              value={form.origin}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
            <select
              name="priceRange"
              value={form.priceRange}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option value="">Price Range (optional)</option>
              <option value="$">$ - Budget Friendly</option>
              <option value="$$">$$ - Moderate</option>
              <option value="$$$">$$$ - Expensive</option>
              <option value="$$$$">$$$$ - Very Expensive</option>
            </select>
          </div>
        </div>

        {/* Ratings */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold text-green-800 mb-3">Ratings</h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block mb-2">Overall Rating *</label>
              <select
                name="overallRating"
                value={form.overallRating}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              >
                <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                <option value={4}>4 ⭐⭐⭐⭐</option>
                <option value={3}>3 ⭐⭐⭐</option>
                <option value={2}>2 ⭐⭐</option>
                <option value={1}>1 ⭐</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2">Taste</label>
                <select
                  name="detailedRatings.taste"
                  value={form.detailedRatings.taste}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Texture</label>
                <select
                  name="detailedRatings.texture"
                  value={form.detailedRatings.texture}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Bitterness</label>
                <select
                  name="detailedRatings.bitterness"
                  value={form.detailedRatings.bitterness}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Sweetness</label>
                <select
                  name="detailedRatings.sweetness"
                  value={form.detailedRatings.sweetness}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block mb-2 font-semibold text-green-800">Review Text *</label>
          <textarea
            name="reviewText"
            placeholder="Write your review..."
            value={form.reviewText}
            onChange={handleChange}
            className="border p-3 rounded-lg h-32 w-full"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 font-semibold text-green-800">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="border p-2 rounded-lg flex-1"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-green-800 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Flavor Notes */}
        <div>
          <label className="block mb-2 font-semibold text-green-800">Flavor Notes</label>
          <div className="flex flex-wrap gap-2">
            {flavorNoteOptions.map((note) => (
              <button
                key={note}
                type="button"
                onClick={() => handleToggleFlavorNote(note)}
                className={`px-3 py-1 rounded-full text-sm ${form.flavorNotes.includes(note)
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
}
