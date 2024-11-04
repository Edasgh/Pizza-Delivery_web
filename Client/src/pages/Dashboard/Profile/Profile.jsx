import React , { useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { getUserDetails } from '../../../redux/slices/userSlice';
import { STATUSES } from '../../../redux/slices/productSlice';

const token = localStorage.getItem("token");

const Profile = () => {
  const dispatch=useDispatch();
  const {data:userDetails,status} = useSelector((state)=>state.user);

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
      return <h2>Loading....</h2>;
    }
  
    if (status === STATUSES.ERROR) {
      return <h2>Something went wrong!</h2>;
    }

  return (
    <>
    <div className="profile-header-content">
    <h2 className="poppins-semibold dashboard-section-title">My Profile</h2>
  </div>
  <div className="profile-content">
    <ul type="none">
      <li><span className='poppins-medium'>Name : </span>{userDetails?.name}</li>
      <li><span className='poppins-medium'>Email : </span>{userDetails?.email}</li>
      <li><span className='poppins-medium'>Address :</span> {userDetails?.address} </li>
    </ul>
  </div>
  <ul type="none" className='buttons-container'>
    <button className="edit-details poppins-semibold" onClick={()=>{navigate(`/profile_dashboard/${userDetails._id}/edit_details`)}} >Edit Details</button>
    <button className="change-password poppins-semibold"  onClick={()=>{navigate(`/profile_dashboard/${userDetails._id}/change_password`)}} >Change Password</button>
  </ul>
  </>
  )
}

export default Profile