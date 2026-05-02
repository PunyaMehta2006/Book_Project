import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import { getBook, getReviews, updateExchange, deleteBook } from "../api";

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

export default function BookDetails({ onBookUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeAvailable, setExchangeAvailable] = useState(false);
  const [exchangeToggling, setExchangeToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelist, setConfirmDelist] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [bookData, reviewData] = await Promise.all([
          getBook(id),
          getReviews(id),
        ]);
        setBook(bookData);
        setExchangeAvailable(bookData.exchangeAvailable);
        setReviews(reviewData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleExchangeToggle = async () => {
    const next = !exchangeAvailable;
    setExchangeAvailable(next); // optimistic update
    setExchangeToggling(true);
    try {
      await updateExchange(id, { exchangeAvailable: next });
      if (onBookUpdated) onBookUpdated();
    } catch {
      setExchangeAvailable(!next); // revert on failure
    } finally {
      setExchangeToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelist) {
      setConfirmDelist(true);
      setTimeout(() => setConfirmDelist(false), 3000); // Reset after 3s
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteBook(id);
      if (onBookUpdated) onBookUpdated();
      navigate("/");
    } catch (err) {
      alert(err.message || "Failed to delist book.");
      setIsDeleting(false);
      setConfirmDelist(false);
    }
  };

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // ── Loading ────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-up">
        <div className="inline-block w-10 h-10 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin mb-4"></div>
        <p className="font-body text-charcoal-muted">Loading book...</p>
      </div>
    );
  }

  // ── Error / Not found ──────────────────────────────
  if (error || !book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-up">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-heading text-2xl text-charcoal mb-2">
          Book not found
        </h2>
        <p className="font-body text-charcoal-muted mb-6">
          {error || "The book you're looking for doesn't exist or has been removed."}
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

  const avgRating =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 animate-fade-up">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-charcoal-muted hover:text-terracotta font-body text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none group"
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

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`inline-flex items-center gap-2 px-4 py-2 font-body text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            confirmDelist
              ? "bg-red-600 text-white hover:bg-red-700 border border-transparent"
              : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {isDeleting ? "Delisting..." : confirmDelist ? "Click again to confirm" : "Delist Book"}
        </button>
      </div>

      {/* Book Details — two-column grid on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] gap-10 xl:gap-14 items-start mb-16 lg:mb-20">
        {/* Cover Image */}
        <div className="w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
          <div className="sticky top-24">
            <div className="bg-warm-white rounded-2xl border border-warm-border shadow-card flex items-center justify-center p-6 sm:p-7">
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                className="w-full max-h-[420px] h-auto object-contain object-center"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x400/FAF7F2/1C1C1C?text=No+Cover";
                }}
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex flex-col">
          <div className="flex flex-col items-stretch text-left">
            {/* Genre Chip */}
            <span className="inline-block self-start bg-sage-light/30 text-sage-dark text-xs font-body font-medium px-3 py-1.5 rounded-full mb-5">
              {book.genre}
            </span>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-charcoal mb-5 leading-[1.15] tracking-tight">
              {book.title}
            </h1>

            {/* Author */}
            <p className="font-body text-lg text-charcoal-muted mb-5">
              by{" "}
              <span className="text-charcoal font-medium">{book.author}</span>
            </p>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-7">
                <StarDisplay rating={avgRating} />
                <span className="font-body text-sm text-charcoal-muted">
                  {avgRating}/5 · {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </span>
              </div>
            )}

            {/* Price + Exchange Toggle */}
            <div className="flex flex-col gap-4 mb-2">
              {/* Price — always shown if set */}
              {book.price ? (
                <span className="font-heading text-3xl font-bold text-terracotta">
                  ₹{book.price}
                </span>
              ) : !exchangeAvailable ? (
                <span className="font-heading text-2xl font-medium text-charcoal-muted italic">
                  Price not set
                </span>
              ) : null}

              {/* Exchange badge — shown when active */}
              {exchangeAvailable && (
                <div className="inline-flex self-start items-center gap-2 bg-sage-light/20 text-sage-dark font-body font-semibold text-sm px-4 py-2 rounded-xl border border-sage-light/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Open to Exchange
                </div>
              )}

              {/* Exchange toggle switch */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  role="switch"
                  aria-checked={exchangeAvailable}
                  onClick={handleExchangeToggle}
                  disabled={exchangeToggling}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sage/40 disabled:opacity-50 disabled:cursor-not-allowed ${
                    exchangeAvailable ? "bg-sage" : "bg-warm-border"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                      exchangeAvailable ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="font-body text-sm text-charcoal">
                  {exchangeToggling
                    ? "Saving..."
                    : exchangeAvailable
                    ? "Exchange enabled"
                    : "Enable exchange"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 pt-10 border-t border-warm-border">
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
              About this Book
            </h2>
            <p className="font-body text-charcoal-light leading-relaxed text-base">
              {book.description}
            </p>
          </div>

          {/* Seller Info Card */}
          <div className="mt-10 pt-10 border-t border-warm-border">
            <h3 className="font-heading text-lg font-semibold text-charcoal mb-6">
              Seller Information
            </h3>
            <div className="bg-warm-white rounded-xl border border-warm-border p-7 sm:p-8 shadow-card">
              <div className="flex items-start gap-5 mb-7">
                <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-terracotta-light to-terracotta flex items-center justify-center text-white font-body font-bold text-lg">
                  {book.seller.name.charAt(0)}
                </div>
                <div className="min-w-0 pt-0.5 space-y-1.5">
                  <p className="font-body font-semibold text-charcoal text-base">
                    {book.seller.name}
                  </p>
                  <p className="font-body text-sm text-charcoal-muted">
                    Verified Seller
                  </p>
                </div>
              </div>

              {/* Contact toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="w-full max-w-xs py-2.5 px-5 bg-terracotta text-white font-body font-semibold text-sm rounded-lg hover:bg-terracotta-dark transition-all duration-300 hover:shadow-lg cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  {showContact ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Hide Contact Info
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Contact Seller
                    </>
                  )}
                </button>
              </div>

              {/* Contact details with smooth reveal */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  showContact ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 bg-cream-dark rounded-lg p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-charcoal-muted" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="font-body text-sm text-charcoal">
                      {book.seller.email}
                    </span>
                  </div>
                  {book.seller.phone && (
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-charcoal-muted" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="font-body text-sm text-charcoal">
                        {book.seller.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-warm-border pt-12 lg:pt-14">
        <div className="w-full">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-10">
            Reviews ({reviews.length})
          </h2>

          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-14 xl:gap-16">
            {/* Review List */}
            <div className="flex-1 min-w-0">
              <ReviewList reviews={reviews} />
            </div>

            {/* Review Form */}
            <div className="w-full lg:w-[22rem] shrink-0">
              <div className="bg-warm-white rounded-xl border border-warm-border p-7 sm:p-8 shadow-card lg:sticky lg:top-24">
                <h3 className="font-heading text-lg font-semibold text-charcoal mb-6">
                  Write a Review
                </h3>
                <ReviewForm bookId={id} onReviewAdded={handleReviewSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
