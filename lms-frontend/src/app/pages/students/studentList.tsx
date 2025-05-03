import React from 'react';
import '../../styles/studentList.css';

interface Student {
  id: number;
  name: string;
  email: string;
  number: string;
}

interface Props {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentList: React.FC<Props> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <div className="student-details">
        <div className="student-name">{student.name}</div>
        <div className="student-email">{student.email}</div>
        <div className="student-number">{student.number}</div>
      </div>
      <div className="student-actions">
        <button className="edit-btn" onClick={() => onEdit(student)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(student)}>Delete</button>
      </div>
    </div>
  );
};

export default StudentList;
