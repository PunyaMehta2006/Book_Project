const genres = [
  "All",
  "Fiction",
  "Non-fiction",
  "Sci-fi",
  "Romance",
  "Academic",
  "Self-help",
];

export default function GenreFilter({ activeGenre, onGenreChange }) {
  return (
    <div>
      {/* Desktop: vertical list */}
      <div className="hidden lg:block text-center">
        <h3 className="font-heading text-xl font-semibold text-charcoal mb-5">
          Browse Genres
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`px-5 py-3 rounded-full text-sm font-body font-semibold text-center transition-all duration-200 cursor-pointer border ${
                activeGenre === genre
                  ? "bg-gradient-to-r from-terracotta to-terracotta-dark text-white border-terracotta shadow-lg"
                  : "bg-warm-white text-charcoal border-warm-border hover:border-terracotta-light hover:text-terracotta hover:shadow-md"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: horizontal scrollable pills */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto genre-scroll pb-2 px-1 justify-center">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-body font-semibold transition-all duration-200 cursor-pointer border ${
                activeGenre === genre
                  ? "bg-gradient-to-r from-terracotta to-terracotta-dark text-white border-terracotta shadow-md"
                  : "bg-warm-white text-charcoal border-warm-border hover:border-terracotta-light hover:text-terracotta"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
