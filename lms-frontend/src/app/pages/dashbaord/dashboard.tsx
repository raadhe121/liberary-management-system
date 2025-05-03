import React, { useEffect, useState } from 'react';
import "../../styles/dashboard.css";
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, deleteStudent, getAllStudents, getMyProfile, logout, updateStudent } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store/configureStore';
import BookCard from '../../components/bookCard';
import { RootState } from 'src/app/redux/slice';
import { addBook, deleteBook, getAllBookList, getAllIssuedBookList, updateBook } from '../../redux/slice/bookSlice';
import StudentList from '../students/studentList';
import BookFormModal from '../book/bookFormModal';
import StudentFormModal from '../students/studentFormModal';
import ProfileScreen from '../profile/profile';

function Dashboard() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [token, setToken] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<any>(null);
  const { myProfile, students } = useSelector((state: RootState) => state.authReducer);
  const { book, issuedBook } = useSelector((state: RootState) => state.bookReducer);


  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSaveStudent = (studentData: any) => {
    if (selectedStudent) {
      dispatch(updateStudent(studentData)).then(() => dispatch(getAllStudents()));
    } else {
      console.log("thisi as",studentData);
      
      dispatch(addStudent(studentData)).then(() => dispatch(getAllStudents()));
    }
    dispatch(getAllStudents());
  };

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleDeleteStudent = (student: any) => {
    swal({
      title: 'Are you sure?',
      text: `Delete ${student.name}?`,
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        dispatch(deleteStudent(student)).then(() => dispatch(getAllStudents()));
      }
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken ?? '');
  }, []);

  useEffect(() => {
    dispatch(getAllBookList());
    setCurrentTab('dashboard');
  }, [dispatch]);

  useEffect(() => {
    if (token !== '') {
      dispatch(getMyProfile(navigate));
      dispatch(getAllIssuedBookList());
    }
  }, [token, dispatch, navigate]);

  const handleSave = (bookData: any) => {
    if (currentBook) {
      dispatch(updateBook({ ...currentBook, ...bookData })).then(() => {
        dispatch(getAllBookList());
        dispatch(getAllIssuedBookList());
      });
    } else {
      dispatch(addBook(bookData)).then(() => {
        dispatch(getAllBookList());
      });
    }
  };
  const handleAddClick = () => {
    setCurrentBook(null);
    setIsModalOpen(true);
  };

  const handleDelete = (book: any) => {
    swal({
      title: "Are you sure?",
      text: `Do you want to delete "${book.name}"?`,
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(deleteBook(book)).then(() => {
          dispatch(getAllBookList());
          dispatch(getAllIssuedBookList());
        });
      }
    });

  }
  const handleEditClick = (book: any) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  return (
    <div className="dashboard-layout">
      <aside className="side-menu">
        <div className="logo-section">
          <h5>{token !== '' ? myProfile?.name : "Hello User!"}</h5>
          <h3>LMS</h3>
        </div>
        <nav className="navigation">
          <ul>
            <li className={currentTab === 'dashboard' ? "active" : ''} onClick={() => {
              setCurrentTab('dashboard')
              dispatch(getAllBookList());
            }}>
              <i className="icon dashboard-icon"></i>
              <span>Dashboard</span>
            </li>
            {token !== '' && myProfile?.roleId !== 3 && (
              <li className={currentTab === 'students' ? "active" : ''} onClick={() => setCurrentTab('students')}>
                <i className="icon tables-icon"></i>
                <span>Students</span>
              </li>
            )}
            <li className={currentTab === 'books' ? "active" : ''} onClick={() => {
              setCurrentTab('books')
              dispatch(getAllBookList());
            }}>
              <i className="icon billing-icon"></i>
              <span>Books</span>
            </li>
            {token !== '' && (
              <li className={currentTab === 'issuedBooks' ? "active" : ''} onClick={() => {
                setCurrentTab('issuedBooks')
                dispatch(getAllIssuedBookList());
              }}>
                <i className="icon rtl-icon"></i>
                <span>Issued Books</span>
              </li>
            )}
            {token !== "" && <li className="menu-header">ACCOUNT PAGES</li>}
            {token !== "" && (
              <li className={currentTab === 'profile' ? "active" : ''} onClick={() => setCurrentTab('profile')}>
                <i className="icon profile-icon"></i>
                <span>Profile</span>
              </li>
            )}
            {token === "" && (
              <li onClick={() => navigate('/login', { replace: true })}>
                <i className="icon sign-in-icon"></i>
                <span>Sign In</span>
              </li>
            )}
            {token !== "" && (
              <li onClick={() => dispatch(logout({ navigate }))}>
                <i className="icon sign-up-icon"></i>
                <span>Logout</span>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      <main className="main-content-area">
        {currentTab === 'dashboard' && (
          <>
            <div className="top-cards">
              <div className="card money-card">
                <h3>Total Available Books</h3>

                <div className="card-value">
                  {book?.data?.length <= 9 ? `0${book?.data?.length}` : book?.data?.length}
                </div>
              </div>
              {myProfile?.roleId !== 3 && (
                <div className="card users-card">
                  <h3>Total Students</h3>
                  <div className="card-value">
                    {students?.data?.length <= 9 ? `0${students?.data?.length}` : students?.data?.length}
                  </div>
                </div>
              )}
            </div>

            <h2>Recently Added Books</h2>
            {book?.data?.length > 0 ? (
              book.data.map((bookItem: any) => (
                <BookCard key={bookItem.id} book={bookItem} onEdit={() => handleEditClick(bookItem)}
                  onDelete={() => { handleDelete(bookItem) }}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No Available books found.</p>
              </div>
            )}
          </>
        )}

        {currentTab === 'books' && (
          <>
            <div className="header-container">
              <h2>All Available Books</h2>
              {myProfile?.roleId !== 3 && <button className="add-btn" onClick={handleAddClick}>
                + Add Book
              </button>}
            </div>
            {book?.data?.length > 0 ? (
              book.data.map((bookItem: any) => (
                <BookCard key={bookItem.id} book={bookItem} onEdit={() => handleEditClick(bookItem)}
                  onDelete={() => { handleDelete(bookItem) }}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No Available books found.</p>
              </div>
            )}
          </>
        )}

        {currentTab === 'students' && (
          <>
            <div className="header-container">
              <h2>Students</h2>
              <button
                className="add-btn"
                onClick={() => {
                  setSelectedStudent(null);
                  setIsStudentModalOpen(true);
                }}
              >
                + Add Student
              </button>
            </div>

            <div className="student-list-container">
              {students?.data?.length > 0 ? (
                students.data.map((student: any) => (
                  <StudentList
                    key={student.id}
                    student={student}
                    onEdit={handleEditStudent}
                    onDelete={handleDeleteStudent}
                  />
                ))
              ) : (
                <p>No students found.</p>
              )}
            </div>
          </>
        )}

        {currentTab === 'issuedBooks' && (
          <>
            <h2>Issued Books</h2>
            {issuedBook?.data?.length > 0 ? (
              issuedBook.data.map((issued: any) => (
                <BookCard key={issued.id} book={issued.Book}
                  onEdit={() => handleEditClick(issued.Book)}
                  onDelete={() => { handleDelete(issued) }}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No issued books found.</p>
              </div>
            )}
          </>
        )}

        {currentTab === 'profile' && (
          <>
          <ProfileScreen/>
          </>
        )}
      </main>
      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        book={currentBook}
      />
      <StudentFormModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
    </div>
  );
}

export default Dashboard;
