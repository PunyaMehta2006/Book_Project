import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/book/${book.id}`)}
      className="group cursor-pointer bg-warm-white rounded-xl border border-warm-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover shadow-card"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/book/${book.id}`)}
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden bg-cream-dark">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400/FAF7F2/1C1C1C?text=No+Cover";
          }}
        />
        {/* Exchange badge overlay */}
        {book.exchange && (
          <div className="absolute top-3 right-3 bg-sage text-white text-xs font-body font-semibold px-3 py-1 rounded-full shadow-md">
            🔄 Exchange
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Genre Chip */}
        <span className="inline-block bg-sage-light/30 text-sage-dark text-xs font-body font-medium px-3 py-1 rounded-full mb-2">
          {book.genre}
        </span>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-charcoal leading-snug mb-1 line-clamp-2 group-hover:text-terracotta transition-colors duration-300">
          {book.title}
        </h3>

        {/* Author */}
        <p className="font-body text-sm text-charcoal-muted mb-3">
          by {book.author}
        </p>

        {/* Price or Exchange */}
        <div className="flex items-center justify-between">
          {book.exchange ? (
            <span className="inline-flex items-center gap-1 text-sage-dark font-body font-semibold text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Open to Exchange
            </span>
          ) : (
            <span className="font-heading text-xl font-bold text-terracotta">
              ₹{book.price}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-charcoal-muted group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
