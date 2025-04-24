import React from 'react';
import '../css/dashboard.css'; // Import the CSS file

function Dashboard() {
    return (
      <div className="dashboard-layout">
        <aside className="side-menu">
          <div className="logo-section">
            {/* Replace with your logo */}
            <h3>LMS</h3>
          </div>
          <nav className="navigation">
            <ul>
              <li className="active">
                <i className="icon dashboard-icon"></i> {/* Replace with your icon component or class */}
                <span>Dashboard</span>
              </li>
              <li>
                <i className="icon tables-icon"></i>
                <span>Tables</span>
              </li>
              <li>
                <i className="icon billing-icon"></i>
                <span>Billing</span>
              </li>
              <li>
                <i className="icon rtl-icon"></i>
                <span>RTL</span>
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
          <div className="need-help">
            {/* Replace with your help section content */}
            <div className="help-card">
              <h4>Need help?</h4>
              <p>Please check our docs</p>
            </div>
          </div>
        </aside>
        <main className="main-content-area">
          <div className="top-cards">
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
            {/* ... other top cards ... */}
          </div>
  
          <div className="main-content">
            <div className="welcome-card">
              {/* ... welcome card content ... */}
            </div>
            {/* ... other main content cards ... */}
          </div>
  
          <div className="sales-overview-card">
            {/* ... sales overview ... */}
          </div>
  
          <div className="timeline-card">
            {/* ... timeline ... */}
          </div>
        </main>
      </div>
    );
  }
  
  export default Dashboard;