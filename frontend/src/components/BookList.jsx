import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="font-heading text-xl text-charcoal mb-2">
          No books found
        </h3>
        <p className="font-body text-charcoal-muted text-center max-w-sm">
          Try adjusting your search or filter to discover more books.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-7">
      {books.map((book, index) => (
        <div
          key={book._id}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
