import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../api";

const genreOptions = [
  "Fiction",
  "Non-fiction",
  "Sci-fi",
  "Romance",
  "Academic",
  "Self-help",
];

export default function AddBook({ onBookAdded }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    exchange: false,
    description: "",
    image: "",
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = true;
    if (!form.author.trim()) newErrors.author = true;
    if (!form.genre) newErrors.genre = true;
    if (!form.exchange && (!form.price || Number(form.price) <= 0))
      newErrors.price = true;
    if (!form.description.trim()) newErrors.description = true;
    if (!form.sellerName.trim()) newErrors.sellerName = true;
    if (!form.sellerEmail.trim()) newErrors.sellerEmail = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        genre: form.genre,
        price: form.price ? Number(form.price) : null,
        exchangeAvailable: form.exchange,
        description: form.description.trim(),
        image:
          form.image.trim() ||
          "https://via.placeholder.com/300x400/FAF7F2/1C1C1C?text=No+Cover",
        seller: {
          name: form.sellerName.trim(),
          email: form.sellerEmail.trim(),
          phone: form.sellerPhone.trim() || undefined,
        },
      };

      await createBook(payload);
      onBookAdded();

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 1800);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = (field) =>
    `w-full px-4 py-3.5 rounded-xl border font-body text-sm bg-warm-white text-charcoal placeholder:text-charcoal-muted/50 outline-none transition-all duration-200 focus:ring-4 focus:ring-terracotta/10 focus:border-terracotta ${
      errors[field]
        ? "border-red-400 ring-2 ring-red-100"
        : "border-warm-border"
    }`;

  return (
    <div className="max-w-[600px] mx-auto px-4 py-8 lg:py-12 animate-fade-up">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 toast-enter">
          <div className="bg-charcoal text-white font-body font-medium text-sm px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Book listed successfully! 🎉
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-2">
          List a Book
        </h1>
        <p className="font-body text-charcoal-muted text-base">
          Share a book you'd like to sell or exchange
        </p>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl font-body text-sm text-red-600">
          ⚠️ {apiError}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-warm-white rounded-2xl border border-warm-border p-7 sm:p-9 shadow-card space-y-6 text-center"
      >
        {/* Title */}
        <div>
          <label htmlFor="add-title" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Book Title <span className="text-terracotta">*</span>
          </label>
          <input id="add-title" name="title" type="text" value={form.title} onChange={handleChange} placeholder="e.g. The Great Gatsby" className={inputClasses("title")} />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="add-author" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Author <span className="text-terracotta">*</span>
          </label>
          <input id="add-author" name="author" type="text" value={form.author} onChange={handleChange} placeholder="e.g. F. Scott Fitzgerald" className={inputClasses("author")} />
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="add-genre" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Genre <span className="text-terracotta">*</span>
          </label>
          <select id="add-genre" name="genre" value={form.genre} onChange={handleChange} className={`${inputClasses("genre")} cursor-pointer`}>
            <option value="">Select a genre</option>
            {genreOptions.map((g) => (<option key={g} value={g}>{g}</option>))}
          </select>
        </div>

        {/* Exchange Toggle */}
        <div className="flex items-center justify-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="exchange" checked={form.exchange} onChange={handleChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-warm-border peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-terracotta/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
          </label>
          <span className="font-body text-sm text-charcoal">Open to exchange</span>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="add-price" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Price (₹) {!form.exchange ? <span className="text-terracotta">*</span> : <span className="text-charcoal-muted font-normal">(optional)</span>}
          </label>
          <input id="add-price" name="price" type="number" min="1" value={form.price} onChange={handleChange} placeholder="e.g. 250" className={inputClasses("price")} />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="add-description" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Description <span className="text-terracotta">*</span>
          </label>
          <textarea id="add-description" name="description" value={form.description} onChange={handleChange} placeholder="Tell buyers about the book's condition, edition, etc." rows={4} className={`${inputClasses("description")} resize-none`} />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="add-image" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Cover Image URL{" "}
            <span className="text-charcoal-muted font-normal">(optional)</span>
          </label>
          <input id="add-image" name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://example.com/book-cover.jpg" className={inputClasses("image")} />
        </div>

        {/* Divider */}
        <div className="border-t border-warm-border pt-4">
          <p className="font-body text-sm font-semibold text-charcoal mb-4">Your Contact Info</p>
        </div>

        {/* Seller Name */}
        <div>
          <label htmlFor="add-seller-name" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Your Name <span className="text-terracotta">*</span>
          </label>
          <input id="add-seller-name" name="sellerName" type="text" value={form.sellerName} onChange={handleChange} placeholder="e.g. Punya Mehta" className={inputClasses("sellerName")} />
        </div>

        {/* Seller Email */}
        <div>
          <label htmlFor="add-seller-email" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Your Email <span className="text-terracotta">*</span>
          </label>
          <input id="add-seller-email" name="sellerEmail" type="email" value={form.sellerEmail} onChange={handleChange} placeholder="e.g. punya@email.com" className={inputClasses("sellerEmail")} />
        </div>

        {/* Seller Phone */}
        <div>
          <label htmlFor="add-seller-phone" className="block font-body text-sm font-semibold text-charcoal mb-1.5">
            Your Phone{" "}
            <span className="text-charcoal-muted font-normal">(optional)</span>
          </label>
          <input id="add-seller-phone" name="sellerPhone" type="tel" value={form.sellerPhone} onChange={handleChange} placeholder="e.g. 9876543210" className={inputClasses("sellerPhone")} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-body font-semibold text-sm rounded-xl hover:from-terracotta-dark hover:to-terracotta transition-all duration-300 hover:shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Listing..." : "List This Book"}
        </button>
      </form>

      {/* Back link */}
      <div className="text-center mt-6">
        <button onClick={() => navigate("/")} className="font-body text-sm text-charcoal-muted hover:text-terracotta transition-colors duration-200 cursor-pointer bg-transparent border-none">
          ← Back to Browse
        </button>
      </div>
    </div>
  );
}
