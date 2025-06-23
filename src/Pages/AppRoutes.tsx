/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Route, Routes, useNavigate } from 'react-router-dom';
import FindJobs from './FindJobs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FindTalentPage from './FindTalentPage';
import TalentProfilePage from './TalentProfilePage';
import PostJobPage from './PostJobPage';
import JobDescPage from './JobDescPage';
import ApplyJobPage from './ApplyJobPage';
import { CompanyPage } from './CompanyPage';
import { PostedJobPage } from './PostedJobPage';
import { JobHistoryPage } from './JobHistoryPage';
import { SignUpPage } from './SignUpPage';
import { ProfilePage } from './ProfilePage';
import { Divider } from '@mantine/core';
import HomePage from './HomePage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';
import ProtectedRoutes from '../Services/ProtectedRoutes';
import PublicRoute from '../Services/PublicRoute';

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On app initialization (or after login), if user has a profileId and profile is empty, fetch profile.
  useEffect(() => {
    if (user?.profileId && (!profile || !profile.id)) {
      getProfile(user.profileId)
        .then((data) => {
          if (data) {
            dispatch(setProfile(data));
          } else {
            console.log('Profile not found - redirecting to create profile');
            navigate('/create-profile');
          }
        })
        .catch((err) => {
          if (err.response?.status !== 404) { // Only log non-404 errors
            console.error("Failed to load profile:", err);
          }
        });
    }
  }, [user, profile, dispatch, navigate]);
  return (
      <div className='relative'>
        <Header />
        <Divider size="xs" color="mineShaft.7" />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><FindTalentPage /></ProtectedRoutes>} />
          <Route path="/jobs/:id" element={<JobDescPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/posted-job/:id" element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoutes>} />
          <Route path="/job-history" element={<JobHistoryPage />} />
          <Route path="/post-job/:id" element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoutes>} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path='/talent-profile/:id' element={<ProtectedRoutes allowedRoles={['EMPLOYER']}><TalentProfilePage /></ProtectedRoutes>} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes> 
        <Footer />
      </div>
  );
};

export default AppRoutes;
