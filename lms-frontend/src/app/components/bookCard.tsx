import React from 'react';
import "../styles/bookList.css";

// Define the props that BookCard will receive
interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    genre: string;
    available: boolean;
    cover?: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="book-card">
      {book.cover && <img src={book.cover} alt={`${book.title} cover`} className="book-cover" />}
      <div className="book-details">
        <div className="book-title">{book.title}</div>
        <div className="book-author">By {book.author}</div>
      </div>
      <div className="book-actions">
        { <button className="return-button" onClick={() => {}}>Return</button>}
        { <button className="issue-button" onClick={() => {}}>Issue</button>}
      </div>
     
    </div>
  );
};

export default BookCard;