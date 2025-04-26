import React, { useState } from 'react';
import '../css/dashboard.css'; // Import the CSS file

function Dashboard() {
  const [currentTab, setCurrentTab] = useState('dashboard')
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
            <li className="menu-header">ACCOUNT PAGES</li>
            <li>
              <i className="icon profile-icon"></i>
              <span>Profile</span>
            </li>
            <li>
              <i className="icon sign-in-icon"></i>
              <span>Sign In</span>
            </li>
            <li>
              <i className="icon sign-up-icon"></i>
              <span>Sign Up</span>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content-area">
        {currentTab == 'dashboard'&&<div className="top-cards">
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
        </div>}
      </main>
    </div>
  );
}

export default Dashboard;