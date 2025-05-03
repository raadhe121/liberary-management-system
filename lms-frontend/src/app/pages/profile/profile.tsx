import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/redux/slice";
import "../../styles/profile.css";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { myProfile } = useSelector((state: RootState) => state.authReducer);
  const [loading, setLoading] = useState(true);

  // Simulate loading until the profile data is available
  useEffect(() => {
    if (myProfile) {
      setLoading(false);
    }
  }, [myProfile]);


  return (
    <div className="profile-screen">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-picture">
          </div>
          <div className="profile-details">
            <h3>{myProfile.name}</h3>
            <p className="role">{myProfile?.role?.name}</p>
            <div className="info">
              <p><strong>Email:</strong> {myProfile.email}</p>
              <p><strong>Phone:</strong> {myProfile.number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
