import { useState } from "react";
import { createReview } from "../api";

export default function ReviewForm({ bookId, onReviewAdded }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (rating === 0) newErrors.rating = true;
    if (!comment.trim()) newErrors.comment = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const review = await createReview(bookId, {
        user: name.trim(),
        rating,
        comment: comment.trim(),
      });

      onReviewAdded(review);

      setName("");
      setRating(0);
      setComment("");
      setErrors({});
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Error */}
      {apiError && (
        <p className="text-red-500 text-xs font-body bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠️ {apiError}
        </p>
      )}

      {/* Name */}
      <div>
        <label htmlFor="review-name" className="block font-body text-sm font-medium text-charcoal mb-2">
          Your Name
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: false }));
          }}
          placeholder="Enter your name"
          className={`w-full px-4 py-3.5 rounded-lg border font-body text-sm bg-warm-white text-charcoal placeholder:text-charcoal-muted/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta ${
            errors.name ? "border-red-400 ring-2 ring-red-100" : "border-warm-border"
          }`}
        />
      </div>

      {/* Star Rating */}
      <div>
        <label className="block font-body text-sm font-medium text-charcoal mb-2">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star);
                if (errors.rating) setErrors((p) => ({ ...p, rating: false }));
              }}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="star-rating-btn p-1 cursor-pointer bg-transparent border-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-colors duration-150 ${
                  star <= (hoveredRating || rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-xs font-body mt-2">Please select a rating</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="review-comment" className="block font-body text-sm font-medium text-charcoal mb-2">
          Your Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (errors.comment) setErrors((p) => ({ ...p, comment: false }));
          }}
          placeholder="Share your thoughts about this book..."
          rows={4}
          className={`w-full px-4 py-3.5 rounded-lg border font-body text-sm bg-warm-white text-charcoal placeholder:text-charcoal-muted/50 outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta ${
            errors.comment ? "border-red-400 ring-2 ring-red-100" : "border-warm-border"
          }`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-terracotta text-white font-body font-semibold text-sm rounded-lg hover:bg-terracotta-dark transition-all duration-300 hover:shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
