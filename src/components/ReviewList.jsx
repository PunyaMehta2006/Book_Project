function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${
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

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="font-body text-charcoal-muted">
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-warm-white rounded-xl border border-warm-border p-5 transition-all duration-200 hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-terracotta-light to-terracotta flex items-center justify-center text-white font-body font-bold text-sm">
                {review.user.charAt(0).toUpperCase()}
              </div>
              <span className="font-body font-semibold text-charcoal">
                {review.user}
              </span>
            </div>
            <StarDisplay rating={review.rating} />
          </div>
          <p className="font-body text-charcoal-light text-sm leading-relaxed pl-12">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
