import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import initialBooks from "./data/books";

export default function App() {
  const [books, setBooks] = useState(initialBooks);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home books={books} />} />
            <Route path="/book/:id" element={<BookDetails books={books} />} />
            <Route
              path="/add-book"
              element={<AddBook onAddBook={handleAddBook} />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-warm-border bg-cream-dark/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-bold text-charcoal">
                  PageTurn
                </span>
                <span className="text-xl">📖</span>
              </div>
              <p className="font-body text-sm text-charcoal-muted">
                Give your books a second life. Buy, sell, or exchange pre-loved
                books.
              </p>
              <p className="font-body text-xs text-charcoal-muted/60">
                © {new Date().getFullYear()} PageTurn
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
