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
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-dark to-cream pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-terracotta/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-sage/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-terracotta/3 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading mx-auto max-w-7xl px-1 text-center text-[clamp(1.28rem,calc(2.1vw_+_0.72rem),3.65rem)] font-bold leading-[1.12] tracking-tight text-charcoal mb-4 whitespace-nowrap">
            Give your books a{" "}
            <span className="text-terracotta italic">second life.</span>
          </h1>
          <p className="font-body text-charcoal-light text-lg sm:text-xl max-w-xl mx-auto mb-8 text-left sm:mb-10">
            Discover pre-loved books from readers near you. Buy, sell, or
            exchange — one page at a time.
          </p>

          {/* Search Bar — flex row; text-left overrides hero text-center */}
          <div className="max-w-xl mx-auto mb-10 sm:mb-12">
            <label
              htmlFor="search-bar"
              className="flex min-h-[3.25rem] items-center rounded-xl border border-warm-border bg-warm-white py-0 pl-4 pr-4 text-left shadow-card transition-[box-shadow,border-color] duration-200 ease-out focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/15"
            >
              <span className="sr-only">Search by title or author</span>
              <span
                className="pointer-events-none flex w-10 shrink-0 items-center justify-center self-stretch text-charcoal-muted"
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or author..."
                className="min-w-0 flex-1 border-0 bg-transparent py-3.5 pl-3 pr-0 font-body text-sm text-charcoal placeholder:text-charcoal-muted/55 outline-none ring-0 focus:ring-0 appearance-none"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-12 lg:pb-14">
        <div className="flex flex-col gap-6 sm:gap-6 lg:flex-row lg:gap-6">
          {/* Sidebar - Genre Filter */}
          <aside className="lg:w-60 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <GenreFilter
                activeGenre={activeGenre}
                onGenreChange={setActiveGenre}
              />
            </div>
          </aside>

          {/* Book Grid */}
          <main className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <p className="font-body text-sm text-charcoal-muted">
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
