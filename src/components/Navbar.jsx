import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-warm-border bg-cream/85 shadow-navbar backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline group"
          >
            <span className="text-2xl sm:text-3xl font-heading font-bold text-charcoal tracking-tight transition-colors duration-200 ease-out group-hover:text-terracotta">
              PageTurn
            </span>
            <span className="text-2xl" role="img" aria-label="book">
              📖
            </span>
          </Link>

          {/* CTA Button */}
          <Link
            to="/add-book"
            className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white no-underline transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">List a Book</span>
            <span className="sm:hidden">List</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
