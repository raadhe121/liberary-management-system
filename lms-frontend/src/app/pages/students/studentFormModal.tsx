import React, { useEffect, useState } from 'react';
import '../../styles/studentModal.css';

interface Student {
  id?: number;
  name: string;
  email: string;
  number: string;
  password?:string
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
  student?: Student | null;
}

const StudentFormModal: React.FC<Props> = ({ isOpen, onClose, onSave, student }) => {
  const [formData, setFormData] = useState<Student>({ name: '', email: '', number: '' });

  useEffect(() => {
    if (student) setFormData(student);
    else setFormData({ name: '', email: '', number: '' });
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={formData.name}  placeholder="Enter Student name" onChange={handleChange} required />
          <label>Email</label>
          <input name="email" value={formData.email} placeholder="Enter Student email" onChange={handleChange} required />
          <label>Password</label>
          <input name="password" value={formData.password} placeholder="Enter Student password" onChange={handleChange} required />
          <label>Phone Number</label>
          <input name="number" value={formData.number} placeholder="Enter Student Phone Number" onChange={handleChange} required />
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">{student ? 'Update' : 'Add'} Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
