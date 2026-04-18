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
      <div className="hidden lg:block">
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
          Browse Genres
        </h3>
        <div className="flex flex-col gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`px-4 py-2.5 rounded-lg text-sm font-body font-medium text-left transition-all duration-200 cursor-pointer border ${
                activeGenre === genre
                  ? "bg-terracotta text-white border-terracotta shadow-md"
                  : "bg-warm-white text-charcoal border-warm-border hover:border-terracotta-light hover:text-terracotta"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: horizontal scrollable pills */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto genre-scroll pb-2 px-1">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 cursor-pointer border ${
                activeGenre === genre
                  ? "bg-terracotta text-white border-terracotta shadow-md"
                  : "bg-warm-white text-charcoal border-warm-border hover:border-terracotta-light"
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
