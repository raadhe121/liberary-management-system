import React, { use, useEffect, useState } from 'react';
import "../../styles/dashboard.css";
import BookList from '../../components/bookList';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/app/redux/store/configureStore';
import BookCard from '../../components/bookCard';


function Dashboard() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [token, setToken] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const getToken = async () => {
    const token = await localStorage.getItem('token');
    setToken(token ?? "")
  }

  useEffect(() => {
    getToken()
  }, [token])
  const books = [
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
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      available: false,
      cover: "https://covers.openlibrary.org/b/id/153541-L.jpg"
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
    <div className="dashboard-layout">
      <aside className="side-menu">
        <div className="logo-section">
          <h3>LMS</h3>
        </div>
        <nav className="navigation">
          <ul>
            <li className={currentTab == 'dashboard' ? "active" : ''} onClick={() => setCurrentTab('dashboard')}>
              <i className="icon dashboard-icon"></i>
              <span>Dashboard</span>
            </li>
            <li className={currentTab == 'students' ? "active" : ''} onClick={() => setCurrentTab('students')}>
              <i className="icon tables-icon"></i>
              <span>Students</span>
            </li>
            <li className={currentTab == 'books' ? "active" : ''} onClick={() => setCurrentTab('books')}>
              <i className="icon billing-icon"></i>
              <span>Books</span>
            </li>
            <li className={currentTab == 'issuedBooks' ? "active" : ''} onClick={() => setCurrentTab('issuedBooks')}>
              <i className="icon rtl-icon"></i>
              <span>Issued Books</span>
            </li>
            <li className={currentTab == 'returedBooks' ? "active" : ''} onClick={() => setCurrentTab('returedBooks')}>
              <i className="icon rtl-icon"></i>
              <span>Retured Books</span>
            </li>
            {token != "" && <li className="menu-header">ACCOUNT PAGES</li>}
            {token != "" && <li>
              <i className="icon profile-icon"></i>
              <span>Profile</span>
            </li>}
            {token == ""&&<li onClick={()=>{
              navigate('/login',{replace:true})
            }}>
              <i className="icon sign-in-icon"></i>
              <span>Sign In</span>
            </li>}
            
            {token != "" && <li onClick={() => {
              dispatch(logout({ navigate }))
            }}>
              <i className="icon sign-up-icon"></i>
              <span >Logout</span>
            </li>}
          </ul>
        </nav>
      </aside>
      <main className="main-content-area">
        {currentTab == 'dashboard' &&
          <><div className="top-cards">
            <div className="card money-card">
              <h3>Today's Money</h3>
              <div className="card-value">
                $53,000 <span className="positive">+55%</span>
              </div>
            </div>
            <div className="card users-card">
              <h3>Today's Users</h3>
              <div className="card-value">
                2,300 <span className="negative">-3%</span>
              </div>
            </div>

          </div>

          <h2>Recent Added Books</h2>
          {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
          </>
        }
        {currentTab == 'books' &&
          <BookList />
        }
      </main>
    </div>
  );
}

export default Dashboard;