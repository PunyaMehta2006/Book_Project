const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    price: 300,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/10527843-L.jpg",
    description:
      "A proven framework for improving every day. James Clear reveals practical strategies that will teach you how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    seller: { name: "Rohan M.", email: "rohan@mail.com", phone: "9876543210" },
    reviews: [
      {
        id: 1,
        user: "Priya",
        rating: 5,
        comment: "Brilliant read, great condition!",
      },
      {
        id: 2,
        user: "Amit",
        rating: 4,
        comment: "Very insightful, minor highlights on a few pages.",
      },
    ],
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    price: 250,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. A gripping, heart-wrenching tale of racial injustice and moral growth.",
    seller: {
      name: "Sneha K.",
      email: "sneha@mail.com",
      phone: "9123456789",
    },
    reviews: [
      {
        id: 1,
        user: "Rahul",
        rating: 5,
        comment: "A timeless classic. Book was in excellent condition.",
      },
    ],
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-fi",
    price: 0,
    exchange: true,
    image: "https://covers.openlibrary.org/b/id/11153086-L.jpg",
    description:
      "Set on the desert planet Arrakis, Dune is the story of Paul Atreides, who would become the mysterious man known as Muad'Dib. An epic science fiction masterpiece of adventure and mysticism.",
    seller: {
      name: "Karthik R.",
      email: "karthik@mail.com",
      phone: "9988776655",
    },
    reviews: [
      {
        id: 1,
        user: "Neha",
        rating: 4,
        comment: "Great sci-fi epic! Spine has minor wear.",
      },
      {
        id: 2,
        user: "Vikram",
        rating: 5,
        comment: "Phenomenal world-building. Worth every page.",
      },
    ],
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    price: 180,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/12645114-L.jpg",
    description:
      "One of the most universally loved and admired English novels, Pride and Prejudice is a brilliant story of manners, morality, and the irresistible force of love.",
    seller: {
      name: "Ananya S.",
      email: "ananya@mail.com",
      phone: "9876501234",
    },
    reviews: [
      {
        id: 1,
        user: "Meera",
        rating: 5,
        comment: "Beautiful edition, pages are clean and crisp!",
      },
    ],
  },
  {
    id: 5,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Non-fiction",
    price: 400,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/8406786-L.jpg",
    description:
      "From examining the role of Homo sapiens in the ecosystem to charting the rise of empires, Sapiens integrates history and science to reconsider everything we know about being human.",
    seller: {
      name: "Dev P.",
      email: "dev@mail.com",
      phone: "9012345678",
    },
    reviews: [
      {
        id: 1,
        user: "Sanjay",
        rating: 4,
        comment: "Mind-blowing perspectives. Book is like new.",
      },
      {
        id: 2,
        user: "Isha",
        rating: 5,
        comment: "Changed the way I think about the world.",
      },
    ],
  },
  {
    id: 6,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    price: 0,
    exchange: true,
    image: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    description:
      "A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the era while standing as a cautionary tale of the American Dream.",
    seller: {
      name: "Arjun D.",
      email: "arjun@mail.com",
      phone: "9876549876",
    },
    reviews: [
      {
        id: 1,
        user: "Tanya",
        rating: 4,
        comment: "Classic Fitzgerald. Some yellowing on pages but readable.",
      },
    ],
  },
  {
    id: 7,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    genre: "Academic",
    price: 650,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/8423128-L.jpg",
    description:
      "The must-have textbook for any serious student of computer science. Comprehensive, covering a broad range of algorithms in depth, yet accessible to all levels.",
    seller: {
      name: "Pooja V.",
      email: "pooja@mail.com",
      phone: "9123409876",
    },
    reviews: [
      {
        id: 1,
        user: "Rishi",
        rating: 5,
        comment: "Essential for CS students. Hardcover in great shape.",
      },
      {
        id: 2,
        user: "Kavya",
        rating: 4,
        comment: "Very thorough. Some pencil notes inside.",
      },
    ],
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 200,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/7883394-L.jpg",
    description:
      "A magical fable about following your dream. Paulo Coelho's enchanting novel has inspired millions of readers around the world with its powerful message about the importance of listening to our hearts.",
    seller: {
      name: "Nisha T.",
      email: "nisha@mail.com",
      phone: "9988001122",
    },
    reviews: [
      {
        id: 1,
        user: "Aditya",
        rating: 5,
        comment: "Life-changing book, pristine condition.",
      },
      {
        id: 2,
        user: "Shreya",
        rating: 4,
        comment: "Beautiful story! Cover has slight wear.",
      },
      {
        id: 3,
        user: "Manish",
        rating: 5,
        comment: "One of my all-time favorites.",
      },
    ],
  },
  {
    id: 9,
    title: "The Notebook",
    author: "Nicholas Sparks",
    genre: "Romance",
    price: 0,
    exchange: true,
    image: "https://covers.openlibrary.org/b/id/8234196-L.jpg",
    description:
      "A story of enduring love set in the South, The Notebook tells the story of Noah and Allie, whose love affair spans decades. A beautiful tale that celebrates the power of love.",
    seller: {
      name: "Divya R.",
      email: "divya@mail.com",
      phone: "9876123456",
    },
    reviews: [
      {
        id: 1,
        user: "Priti",
        rating: 5,
        comment: "So romantic! Made me cry. Great condition.",
      },
    ],
  },
  {
    id: 10,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Non-fiction",
    price: 350,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/8543875-L.jpg",
    description:
      "Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. Engaging and profound insights into human decision-making.",
    seller: {
      name: "Suresh M.",
      email: "suresh@mail.com",
      phone: "9012340000",
    },
    reviews: [
      {
        id: 1,
        user: "Deepak",
        rating: 4,
        comment: "Dense but rewarding. Paperback in good condition.",
      },
      {
        id: 2,
        user: "Lakshmi",
        rating: 5,
        comment: "Fascinating read about cognitive biases.",
      },
    ],
  },
  {
    id: 11,
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    price: 220,
    exchange: false,
    image: "https://covers.openlibrary.org/b/id/12473889-L.jpg",
    description:
      "A dystopian social science fiction novel that has become a modern classic. Orwell's prophetic vision of a totalitarian future is as relevant today as when it was first published.",
    seller: {
      name: "Varun S.",
      email: "varun@mail.com",
      phone: "9876500001",
    },
    reviews: [
      {
        id: 1,
        user: "Aarav",
        rating: 5,
        comment: "Terrifyingly relevant. Book is in excellent shape.",
      },
    ],
  },
  {
    id: 12,
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    genre: "Self-help",
    price: 0,
    exchange: true,
    image: "https://covers.openlibrary.org/b/id/8384353-L.jpg",
    description:
      "A practical guide to harnessing the power within you. Dr. Murphy gives you the tools to unlock the awesome powers of your subconscious mind for improved relationships, health, and success.",
    seller: {
      name: "Geeta N.",
      email: "geeta@mail.com",
      phone: "9876512345",
    },
    reviews: [
      {
        id: 1,
        user: "Rohit",
        rating: 4,
        comment: "Thought-provoking content. Some underlining inside.",
      },
      {
        id: 2,
        user: "Simran",
        rating: 5,
        comment: "Absolutely transformative read!",
      },
    ],
  },
];

export default books;
