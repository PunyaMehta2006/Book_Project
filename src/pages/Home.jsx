import { useState, useMemo } from "react";
import GenreFilter from "../components/GenreFilter";
import BookList from "../components/BookList";

export default function Home({ books }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    let result = books;

    // Genre filter
    if (activeGenre !== "All") {
      result = result.filter((book) => book.genre === activeGenre);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    return result;
  }, [books, activeGenre, searchQuery]);

  return (
    <div className="animate-fade-up">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-soft via-cream-dark to-cream py-14 sm:py-18 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-terracotta/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-sage/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-terracotta/3 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-5 leading-tight">
            Give your books a<br />
            <span className="text-terracotta italic">second life.</span>
          </h1>
          <p className="font-body text-charcoal-light text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Discover pre-loved books from readers near you. Buy, sell, or
            exchange — one page at a time.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-7xl px-2 mr-2 text-charcoal-muted"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl border border-warm-border bg-warm-white/95 font-body text-base text-charcoal placeholder:text-charcoal-muted/60 outline-none transition-all duration-300 focus:ring-4 focus:ring-terracotta/15 focus:border-terracotta shadow-card hover:shadow-card-hover"
              id="search-bar"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col items-center gap-8">
          {/* Sidebar - Genre Filter */}
          <aside className="w-full">
            <div className="max-w-4xl mx-auto px-20">
              <GenreFilter
                activeGenre={activeGenre}
                onGenreChange={setActiveGenre}
              />
            </div>
          </aside>

          {/* Book Grid */}
          <main className="w-full">
            {/* Results count */}
            <div className="flex items-center justify-center mb-8">
              <p className="font-body text-base text-charcoal-muted text-center">
                Showing{" "}
                <span className="font-semibold text-charcoal">
                  {filteredBooks.length}
                </span>{" "}
                {filteredBooks.length === 1 ? "book" : "books"}
                {activeGenre !== "All" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="text-terracotta font-medium">
                      {activeGenre}
                    </span>
                  </span>
                )}
              </p>
            </div>

            <BookList books={filteredBooks} />
          </main>
        </div>
      </section>
    </div>
  );
}
