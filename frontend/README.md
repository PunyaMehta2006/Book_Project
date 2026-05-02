# The Second Chapter 📖

![The Second Chapter](https://via.placeholder.com/1200x400/faf7f2/334155?text=The+Second+Chapter)

**The Second Chapter** is a vibrant, community-driven web application designed to give second-hand books a new life. It connects readers locally, allowing them to buy, sell, or exchange their pre-loved books—one page at a time. The platform features an aesthetic, clean, and intuitive user interface built with modern web technologies.

---

## 🚀 Key Features

- **Book Discovery:** Browse through a beautiful, responsive grid of available second-hand books.
- **Categorization:** Instantly filter books by genre (Fiction, Sci-fi, Romance, Academic, Self-help, etc.).
- **Smart Search:** Search by book title or author in real-time.
- **Dedicated Book Detail Pages:** View comprehensive details about a book, including a description, seller information, and current owner's review ratings.
- **Community Reviews:** Leave ratings and text reviews for books.
- **Exchange System:** Differentiates between books that are strictly for sale (₹ price tag) and those open to direct bartering/exchange (🔄 Open to Exchange chip).
- **List Your Own Books:** An intuitive form interface allowing users to upload and list new books onto the platform effortlessly.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** Inline minimal SVG icons
- **State Management:** React Hooks (`useState`, `useMemo`, etc.)

---

## 📂 Project Structure

```text
frontend/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images and local static files used by CSS/JS
│   ├── components/         # Reusable UI components
│   │   ├── BookCard.jsx    # The individual card design for a book display
│   │   ├── BookList.jsx    # Responsible for rendering the grid of BookCards
│   │   ├── GenreFilter.jsx # The filter menu for selecting book genres
│   │   ├── Navbar.jsx      # Top navigation header & logo
│   │   ├── ReviewForm.jsx  # Form logic for submitting a book review
│   │   └── ReviewList.jsx  # Visualization of user reviews on a book detail page
│   ├── data/
│   │   └── books.js        # Mock backend database/JSON mock data for books
│   ├── pages/              # Primary route pages
│   │   ├── Home.jsx        # Landing page with the hero section, search, and book list
│   │   ├── AddBook.jsx     # Form page for users to list a new book
│   │   └── BookDetails.jsx # Detailed view of a single book and seller contact info
│   ├── App.jsx             # Main router integration and layout
│   ├── main.jsx            # React root application bootstrap entry
│   └── index.css           # Global CSS variables, theme definitions & Tailwind directives
├── index.html              # Main HTML entry point configuring the document head
├── package.json            # NPM dependencies and project scripts
└── vite.config.js          # Vite configuration
```

---

## 🧠 Core Logic & Syntax Explanations

To help your team understand the codebase, here is a breakdown of the central logic patterns and React concepts utilized:

### 1. Global State & Prop Drilling (`App.jsx`)
The core state of the application—the array of all books (`books`)—is managed at the highest level in `App.jsx` using the `useState` hook.
```jsx
const [books, setBooks] = useState(initialBooks);
```
By lifting the state up to the root, the `books` array can be passed down as **props** to `Home` (for displaying all books) and `BookDetails` (for displaying a specific book). Conversely, `AddBook` takes an `onAddBook` function prop to push new books *up* into this global state.

### 2. Client-Side Routing (`react-router-dom`)
Navigation is handled seamlessly without reloading the browser window via React Router.
```jsx
<Routes>
  <Route path="/" element={<Home books={books} />} />
  <Route path="/book/:id" element={<BookDetails books={books} />} />
</Routes>
```
The `/book/:id` route is particularly important. In `BookDetails.jsx`, the `useParams()` hook is utilized to extract the `:id` from the URL, which is then parsed as an integer to perform a `.find()` lookup on the global `books` array to render the matching book.

### 3. Performance Optimization with `useMemo` (`Home.jsx`)
In `Home.jsx`, users can filter books by **Genre** and search by **Title/Author**. To prevent re-calculating this filtered list on every single minor DOM re-render, `useMemo` is used.
```jsx
const filteredBooks = useMemo(() => {
  let result = books;
  // Apply genre filter
  if (activeGenre !== "All") result = result.filter(b => b.genre === activeGenre);
  // Apply search query text filter
  if (searchQuery.trim()) result = result.filter(b => b.title.includes(query));
  return result;
}, [books, activeGenre, searchQuery]);
```
This syntax states: "Only re-run this filtering logic if either `books`, `activeGenre`, or `searchQuery` values actually change."

### 4. Dynamic & Conditional Tailoring of CSS (`GenreFilter.jsx`)
Tailwind CSS relies heavily on string interpolation to apply classes dynamically based on state. 
```jsx
className={`rounded-xl px-8 py-4 ${activeGenre === genre ? baseActive : baseInactive}`}
```
This syntax dynamically changes the appearance of genre buttons (giving them a blue styling) when clicked.

---

## 💻 Local Development

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Navigate into the frontend repository:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```

The app will usually run at `http://localhost:5173/`. 

### Building for Production
To generate a production-ready build:
```bash
npm run build
```
The compiled files will be located in the `dist` folder.

---

## 🎨 UI/UX Design System

The application relies heavily on an earth-toned, warm color palette defined in `src/index.css`:
- **Neutrals:** Cream (`#e8eef6`), Warm White (`#ffffff`), Charcoal (`#334155`).
- **Primary:** Terracotta Blue (`#0284c7`) acting as the primary CTA and action color.
- **Secondary:** Sage Green (`#059669`) frequently used for exchange chips and badges.
- **Typography:** Uses **Playfair Display** for robust headers and **Inter** for clean body text.

It embraces standard mobile-first responsive design, ensuring that filters become horizontal scroll bars on mobile, while elegantly expanding into sidebars on desktop resolutions.

---

*Happy reading! Let's give every story a Second Chapter.* 📚
