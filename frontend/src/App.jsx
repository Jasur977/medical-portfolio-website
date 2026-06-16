import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { fetchHealth, fetchProfiles, isAuthenticated, logout } from './api';
import LandingPage from './components/LandingPage';
import DoctorProfile from './components/DoctorProfile';
import ClinicalCaseList from './components/ClinicalCaseList';
import CourseList from './components/CourseList';
import CoursePlayer from './components/CoursePlayer';
import AdminPanel from './components/AdminPanel';
import AdminCoursePanel from './components/AdminCoursePanel';
import AdminProfilePanel from './components/AdminProfilePanel';
import LoginModal from './components/LoginModal';

function App() {
  const { t, i18n } = useTranslation();
  
  const [healthStatus, setHealthStatus] = useState(t('checking_status'));
  const [profiles, setProfiles] = useState([]);
  
  // Auth state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Edit states
  const [caseToEdit, setCaseToEdit] = useState(null);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [profileToEdit, setProfileToEdit] = useState(null);

  // Navigation state for Courses
  const [selectedCourse, setSelectedCourse] = useState(null);

  // References to trigger list refreshes
  const caseListRef = useRef(null);
  const courseListRef = useRef(null);

  const loadProfiles = () => {
    fetchProfiles()
        .then(data => setProfiles(data))
        .catch(err => console.error(err));
  };

  useEffect(() => {
    setIsAdmin(isAuthenticated());

    fetchHealth()
      .then(data => setHealthStatus(t('online')))
      .catch(err => setHealthStatus(t('offline')));
      
    loadProfiles();
  }, [t]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleCaseAddedOrUpdated = () => {
      if (caseListRef.current) {
          caseListRef.current.refreshCases();
      }
      setCaseToEdit(null); // Clear edit mode if it was active
  };

  const handleCourseAddedOrUpdated = () => {
      if (courseListRef.current) {
          courseListRef.current.refreshCourses();
      }
      setCourseToEdit(null);
  };

  const handleProfileUpdated = () => {
      loadProfiles();
      setProfileToEdit(null);
  };

  const handleEditCase = (clinicalCase) => setCaseToEdit(clinicalCase);
  const handleEditCourse = (course) => setCourseToEdit(course);
  const handleEditProfile = (profile) => setProfileToEdit(profile);

  const handleLoginSuccess = () => {
      setIsAdmin(true);
      setShowLoginModal(false);
  };

  const handleLogout = () => {
      logout();
      setIsAdmin(false);
  };

  const mainProfile = profiles.length > 0 ? profiles[0] : null;

  // If a course is selected, render ONLY the Course Player
  if (selectedCourse) {
      return (
          <CoursePlayer 
              course={selectedCourse} 
              onBack={() => {
                  setSelectedCourse(null);
                  handleCourseAddedOrUpdated(); // refresh in case lessons changed
              }} 
              isAdmin={isAdmin}
          />
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative">
      
      {/* Navbar / Header area */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-40">
         <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            <h1 className="text-xl font-bold text-blue-900 tracking-tight">Endo<span className="text-blue-600">Care</span></h1>
         </div>
         
         <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t('nav_home')}</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t('nav_about')}</a>
            <a href="#clinical-cases" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t('nav_clinical_cases')}</a>
            <a href="#education" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t('nav_education')}</a>
         </div>

         {/* Right side controls */}
         <div className="flex space-x-4 items-center">
            <div className="flex space-x-1">
                <button onClick={() => changeLanguage('en')} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${i18n.language === 'en' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}>EN</button>
                <button onClick={() => changeLanguage('ru')} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${i18n.language === 'ru' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}>RU</button>
                <button onClick={() => changeLanguage('uz')} className={`px-2 py-1 rounded text-xs font-medium transition-colors ${i18n.language === 'uz' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}>UZ</button>
            </div>
            
            <div className="border-l border-gray-300 pl-4">
                {isAdmin ? (
                    <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">{t('logout_admin')}</button>
                ) : (
                    <button onClick={() => setShowLoginModal(true)} className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">{t('doctor_login')}</button>
                )}
            </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      <LandingPage profile={mainProfile} />

      <main id="about" className="max-w-5xl mx-auto p-4 py-20 flex flex-col items-center">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('about_doctor')}</h2>
            <p className="mt-4 text-lg text-gray-500">{t('about_doctor_desc')}</p>
        </div>
        
        <div className="w-full">
            {mainProfile ? (
                <DoctorProfile 
                    profile={mainProfile} 
                    isAdmin={isAdmin}
                    onEditClick={handleEditProfile}
                />
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 italic">{t('no_profiles')}</p>
                </div>
            )}
        </div>
      </main>

      <ClinicalCaseList 
          ref={caseListRef} 
          isAdmin={isAdmin} 
          onEditCase={handleEditCase} 
      />

      <CourseList 
          ref={courseListRef}
          onSelectCourse={setSelectedCourse} 
          isAdmin={isAdmin}
          onEditCourse={handleEditCourse}
      />

      {isAdmin && (
          <>
              <AdminPanel onCaseAdded={handleCaseAddedOrUpdated} caseToEdit={caseToEdit} onCloseEdit={() => setCaseToEdit(null)} />
              <AdminCoursePanel onCourseAdded={handleCourseAddedOrUpdated} courseToEdit={courseToEdit} onCloseEdit={() => setCourseToEdit(null)} />
              <AdminProfilePanel profileToEdit={profileToEdit} onClose={() => setProfileToEdit(null)} onProfileUpdated={handleProfileUpdated} />
          </>
      )}

      <footer id="contact" className="bg-gray-900 text-white py-12 text-center">
         <p className="mb-4">© 2026 {mainProfile?.name || 'Doctor'}. {t('all_rights_reserved')}</p>
         <div className="text-xs text-gray-500 flex justify-center items-center">
             <span>{t('system_status')} </span>
             <div className={`w-2 h-2 rounded-full mx-2 ${healthStatus === t('online') ? 'bg-green-500' : 'bg-red-500'}`}></div>
             <span>{healthStatus}</span>
         </div>
      </footer>
    </div>
  )
}

export default App