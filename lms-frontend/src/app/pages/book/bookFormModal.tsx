import React, { useState, useEffect } from 'react';
import '../../styles/bookFormModel.css'; // Correct the file name if needed

interface Book {
  id?: number;
  name: string;
  author: string;
}

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookData: Book) => void;
  book?: Book | null;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ isOpen, onClose, onSave, book }) => {
  const [formData, setFormData] = useState<Book>({ name: '', author: ''});

  useEffect(() => {
    console.log("this is book",book);
    
    if (book) {
      setFormData(book);
    } else {
      setFormData({ name: '', author: '' });
    }
  }, [book,isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">{book ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              id="title"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>
          
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">{book ? 'Update' : 'Add'} Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
