import React from 'react';
import "../styles/bookList.css";
import BookCard from './bookCard';

// Define the Book interface for type safety
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  cover?: string; // Cover is optional
}

const BookList: React.FC = () => {
  const books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      available: true,
      cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      available: false,
      cover: "https://covers.openlibrary.org/b/id/153541-L.jpg"
    },
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        available: true,
        cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        available: false,
        cover: "https://covers.openlibrary.org/b/id/153541-L.jpg"
      },
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        available: true,
        cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        available: false,
        cover: "https://covers.openlibrary.org/b/id/153541-L.jpg"
      },
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        available: true,
        cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        available: false,
        cover: "https://covers.openlibrary.org/b/id/153541-L.jpg"
      },
      
    // Add more book objects...
  ];

  return (
    <div className="book-list-container">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;