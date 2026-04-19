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
  const baseInactive =
    "bg-warm-white text-charcoal border-warm-border hover:bg-cream-dark/90 hover:border-terracotta-light/50 hover:text-terracotta";
  const baseActive =
    "bg-terracotta text-white border-terracotta shadow-md";

  return (
    <div className="space-y-4 lg:space-y-0">
      {/* Mobile/Tablet: heading + horizontal pills */}
      <div className="lg:hidden">
        <h3 className="font-heading text-base font-semibold text-charcoal mb-3 sm:mb-4 tracking-tight">
          Browse Genres
        </h3>
        <div className="flex gap-3 overflow-x-auto genre-scroll pb-1 -mx-1 px-1">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreChange(genre)}
              className={`flex-shrink-0 rounded-full border px-5 py-2.5 text-sm font-body font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out cursor-pointer ${
                activeGenre === genre ? baseActive : baseInactive
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: vertical list */}
      <div className="hidden lg:block">
        <h3 className="font-heading text-lg font-semibold text-charcoal mb-5 tracking-tight">
          Browse Genres
        </h3>
        <div className="flex flex-col gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreChange(genre)}
              className={`rounded-xl border px-5 py-3 text-left text-sm font-body font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out cursor-pointer ${
                activeGenre === genre ? baseActive : baseInactive
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
