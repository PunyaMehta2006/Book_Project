import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

function StarDisplay({ rating, size = "h-5 w-5" }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`${size} ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BookDetails({ books }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [localReviews, setLocalReviews] = useState(null);

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-up">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-heading text-2xl text-charcoal mb-2">
          Book not found
        </h2>
        <p className="font-body text-charcoal-muted mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white font-body font-semibold text-sm rounded-lg hover:bg-terracotta-dark transition-all duration-300 no-underline"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  const reviews = localReviews ?? book.reviews;
  const avgRating =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        )
      : 0;

  const handleReviewSubmit = (review) => {
    const current = localReviews ?? [...book.reviews];
    setLocalReviews([review, ...current]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 animate-fade-up">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 text-charcoal-muted hover:text-terracotta font-body text-sm font-medium mb-8 transition-colors duration-200 cursor-pointer bg-transparent border-none group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Browse
      </button>

      {/* Book Details */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
        {/* Cover Image */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-warm-white rounded-2xl border border-warm-border shadow-card flex items-center justify-center p-5">
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                className="w-full max-h-[420px] h-auto object-contain object-center"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x400/f8f6f3/2d2b29?text=No+Cover";
                }}
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          {/* Genre Chip */}
          <span className="inline-block bg-sage-light/30 text-sage-dark text-xs font-body font-medium px-3 py-1 rounded-full mb-3">
            {book.genre}
          </span>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-2 leading-tight">
            {book.title}
          </h1>

          {/* Author */}
          <p className="font-body text-lg text-charcoal-muted mb-4">
            by{" "}
            <span className="text-charcoal font-medium">{book.author}</span>
          </p>

          {/* Rating Summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <StarDisplay rating={avgRating} />
              <span className="font-body text-sm text-charcoal-muted">
                {avgRating}/5 · {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}

          {/* Price / Exchange */}
          <div className="mb-6">
            {book.exchange ? (
              <div className="inline-flex items-center gap-2 bg-sage-light/20 text-sage-dark font-body font-semibold text-lg px-5 py-2.5 rounded-xl border border-sage-light/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Open to Exchange
              </div>
            ) : (
              <span className="font-heading text-3xl font-bold text-terracotta">
                ₹{book.price}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">
              About this Book
            </h2>
            <p className="font-body text-charcoal-light leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Seller Info Card */}
          <div className="bg-warm-white rounded-xl border border-warm-border p-6">
            <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
              Seller Information
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta-light to-terracotta flex items-center justify-center text-white font-body font-bold text-lg">
                {book.seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-body font-semibold text-charcoal">
                  {book.seller.name}
                </p>
                <p className="font-body text-sm text-charcoal-muted">
                  Verified Seller
                </p>
              </div>
            </div>

            {/* Contact toggle */}
            <button
              onClick={() => setShowContact(!showContact)}
              className="w-full py-3 bg-terracotta text-white font-body font-semibold text-sm rounded-lg hover:bg-terracotta-dark transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {showContact ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Hide Contact Info
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Contact Seller
                </>
              )}
            </button>

            {/* Contact details with smooth reveal */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                showContact ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-2 bg-cream-dark rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-charcoal-muted"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="font-body text-sm text-charcoal">
                    {book.seller.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-charcoal-muted"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-body text-sm text-charcoal">
                    {book.seller.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-warm-border pt-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-8">
            Reviews ({reviews.length})
          </h2>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Review List */}
            <div className="flex-1">
              <ReviewList reviews={reviews} />
            </div>

            {/* Review Form */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-warm-white rounded-xl border border-warm-border p-6 lg:sticky lg:top-24">
                <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
                  Write a Review
                </h3>
                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
