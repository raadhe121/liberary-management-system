import React, { useEffect, useState } from 'react';
import "../styles/bookList.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store/configureStore';
import {
  getAllBookList,
  getAllIssuedBookList,
  issueBook,
  returnBook,
} from '../redux/slice/bookSlice';
import swal from 'sweetalert';
import { RootState } from '../redux/slice';

// Define props for BookCard
interface BookCardProps {
  book: {
    id: number;
    name: string;
    author: string;
    bookStatus: string;
    available: boolean;
    cover?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;

}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { myProfile } = useSelector((state: RootState) => state.authReducer);

 

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const handleIssue = () => {
    if(!token){
      navigate('/login')
    }else{
      swal({
        title: "Are you sure?",
        text: `Do you want to issue "${book.name}"?`,
        icon: "warning",
        buttons: ["Cancel", "Yes, issue it!"],
        dangerMode: true,
      }).then((confirm) => {
        if (confirm) {
          dispatch(issueBook(book.id))
            .then((response: any) => {
              swal("Success!", response?.payload?.message || "Book issued successfully", "success");
              dispatch(getAllIssuedBookList());
              dispatch(getAllBookList());
            })
            .catch(() => {
              swal("Error", "Failed to issue book", "error");
            });
        }
      });
    }
    
  };

  const handleReturn = () => {
   if(!token){
    navigate('/login')
  }else{
    swal({
      title: "Are you sure?",
      text: `Do you want to return "${book.name}"?`,
      icon: "warning",
      buttons: ["Cancel", "Yes, return it!"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(returnBook(book.id)).then((response: any) => {
          swal("Returned!", response?.payload?.message || "Book returned successfully", "success");
          dispatch(getAllIssuedBookList());
          dispatch(getAllBookList());
        });
      }
    });
   }
  };

  // if (!token) {
  //   return (
  //     <div className="book-card">
  //       <p>You must be logged in to issue or return books.</p>
  //       <button onClick={() => navigate('/login')}>Login</button>
  //     </div>
  //   );
  // }

  return (
    <div className="book-card">
      {book.cover && (
        <img src={book.cover} alt={`${book.name} cover`} className="book-cover" />
      )}
      <div className="book-details">
        <div className="book-title">{book.name}</div>
        <div className="book-author">By {book.author}</div>
      </div>

      <div className="book-actions">
        {book.bookStatus === 'issued' ? (
          <button className="return-button" onClick={handleReturn}>Return</button>
        ) : (
          <button className="issue-button" onClick={handleIssue}>Issue</button>
        )}
        {onEdit && myProfile?.roleId !== 3 && <button className="edit-button" onClick={onEdit}>Edit</button>}
        {onDelete && myProfile?.roleId !== 3 && <button className="delete-button" onClick={onDelete}>Delete</button>}
      </div>
    </div>
  );
};

export default BookCard;
