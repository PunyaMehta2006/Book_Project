import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import { getBooks } from "./api";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks(params);
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  books={books}
                  loading={loading}
                  error={error}
                  onFilter={fetchBooks}
                />
              }
            />
            <Route 
              path="/book/:id" 
              element={<BookDetails onBookUpdated={() => fetchBooks()} />} 
            />
            <Route
              path="/add-book"
              element={<AddBook onBookAdded={() => fetchBooks()} />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-warm-border bg-cream-dark/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-bold text-charcoal">
                  The Second Chapter
                </span>
                <span className="text-xl">📖</span>
              </div>
              <p className="font-body text-sm text-charcoal-muted">
                Give your books a second life. Buy, sell, or exchange pre-loved
                books.
              </p>
              <p className="font-body text-xs text-charcoal-muted/60">
                © {new Date().getFullYear()} The Second Chapter
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
