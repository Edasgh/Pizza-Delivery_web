import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/slices/userSlice";
import { STATUSES } from "../../../redux/slices/productSlice";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";

const token = localStorage.getItem("token");

const Profile = () => {
  const dispatch = useDispatch();
  const { data: userDetails, status } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  if (status === STATUSES.LOADING) {
    return (
      <div style={{ width: "70vw", height: "50vh" }}>
        <Loading />
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <div style={{ width: "70vw", height: "70vh" }}>
        <ErrorPage />
      </div>
    );
  }

  return (
    <>
      <div className="profile-header-content">
        <h2 className="poppins-semibold dashboard-section-title">My Profile</h2>
      </div>
      <div className="profile-content">
        <ul type="none">
          <li>
            <span className="poppins-medium">Name : </span>
            {userDetails?.name}
          </li>
          <li>
            <span className="poppins-medium">Email : </span>
            {userDetails?.email}
          </li>
          <li>
            <span className="poppins-medium">Address :</span>{" "}
            {userDetails?.address}{" "}
          </li>
        </ul>
      </div>
      <ul type="none" className="buttons-container">
        <button
          className="poppins-semibold"
          style={{
            padding: " .4rem .8rem",
            fontSize: " 1rem",
            outline: "none",
            border: "none",
            cursor: "pointer",
            backgroundColor: "var(--color-update)",
            color: "var(--text-colorb)",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          {" "}
          Log Out
        </button>
        <button
          className="edit-details poppins-semibold"
          onClick={() => {
            navigate(`/profile_dashboard/${userDetails._id}/edit_details`);
          }}
        >
          Edit Details
        </button>
        <button
          className="change-password poppins-semibold"
          onClick={() => {
            navigate(`/profile_dashboard/${userDetails._id}/change_password`);
          }}
        >
          Change Password
        </button>
      </ul>
    </>
  );
};

export default Profile;
