import React, { useEffect, useState } from 'react';
import '../../styles/studentModal.css';
import { validatePassword } from '../../../utils';

interface Student {
  id?: number;
  name: string;
  email: string;
  number: string;
  password?: string
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
    else setFormData({ name: '', email: '', number: '', password: '' });
  }, [student, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!student && formData.password) {
    const validationMessage = validatePassword(formData.password);

    if (validationMessage !== "Valid") {
      swal("Invalid Password", validationMessage, "error");
      return;
    }
  }

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
          <input name="name" value={formData.name} placeholder="Enter Student name" onChange={handleChange} />
          <label>Email</label>
          <input name="email" readOnly={student?true:false} type='email' value={formData.email} placeholder="Enter Student email" onChange={handleChange} />
          {!student && <label>Password</label>}
          {!student && <input name="password" value={formData.password} placeholder="Enter Student password" onChange={handleChange} />}
          <label>Phone Number</label>
          <input name="number" value={formData.number} placeholder="Enter Student Phone Number" maxLength={10} onChange={handleChange} />
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={() => {
              onClose();
              setFormData({ name: '', email: '', number: '', password: '' });
            }}>Cancel</button>
            <button type="submit" className="save-btn">{student ? 'Update' : 'Add'} Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
