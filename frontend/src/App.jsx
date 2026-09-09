import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { fetchHealth, fetchProfiles, isAuthenticated, logout } from './api';
import { useAdminSession } from './hooks/useAdminSession';
import AdminSessionModal, { AdminSessionBadge } from './components/AdminSessionModal';
import LandingPage from './components/LandingPage';
import CalculatorsHub from './components/CalculatorsHub';
import ForPhysicians from './components/ForPhysicians';
import ForPatients from './components/ForPatients';
import DoctorProfile from './components/DoctorProfile';
import ClinicalCaseList from './components/ClinicalCaseList';
import CourseList from './components/CourseList';
import CoursePlayer from './components/CoursePlayer';
import MediaHub from './components/MediaHub';
import AdminPanel from './components/AdminPanel';
import AdminCoursePanel from './components/AdminCoursePanel';
import AdminProfilePanel from './components/AdminProfilePanel';
import LoginModal from './components/LoginModal';
import GlobalSearch from './components/GlobalSearch';
import ClinicalCaseDetailModal from './components/ClinicalCaseDetailModal';

function App() {
  const { t, i18n } = useTranslation();
  
  const [healthStatus, setHealthStatus] = useState('checking_status');
  const [profiles, setProfiles] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Auth state
  const [isAdmin, setIsAdmin] = useState(() => isAuthenticated());
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Edit states
  const [caseToEdit, setCaseToEdit] = useState(null);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [profileToEdit, setProfileToEdit] = useState(null);

  // Navigation state for Courses
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  // References to trigger list refreshes
  const caseListRef = useRef(null);
  const courseListRef = useRef(null);

  const loadProfiles = () => {
    fetchProfiles()
        .then(data => setProfiles(data))
        .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchHealth()
      .then(() => setHealthStatus('online'))
      .catch(() => setHealthStatus('offline'));
      
    loadProfiles();
  }, []);

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
      setCaseToEdit(null);
      setCourseToEdit(null);
      setProfileToEdit(null);
  };

  const {
      remainingSeconds,
      formattedTime,
      showWarning: showSessionWarning,
      extendSession
  } = useAdminSession({
      isAdmin,
      onLogout: handleLogout,
      timeoutMinutes: 100,
      warningSeconds: 60
  });

  // Listen for external auth events
  useEffect(() => {
      const onAuthLogout = () => {
          setIsAdmin(false);
          setCaseToEdit(null);
          setCourseToEdit(null);
          setProfileToEdit(null);
      };
      const onAuthLogin = () => {
          setIsAdmin(true);
      };
      window.addEventListener('auth:logout', onAuthLogout);
      window.addEventListener('auth:login', onAuthLogin);
      return () => {
          window.removeEventListener('auth:logout', onAuthLogout);
          window.removeEventListener('auth:login', onAuthLogin);
      };
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const sectionIds = ['home', 'calculators', 'for-physicians', 'for-patients', 'clinical-cases', 'education', 'about', 'media'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav_home'), href: '#home' },
    { id: 'calculators', label: t('nav_calculators'), href: '#calculators', badge: '50' },
    { id: 'for-physicians', label: t('nav_for_physicians'), href: '#for-physicians' },
    { id: 'for-patients', label: t('nav_for_patients'), href: '#for-patients' },
    { id: 'clinical-cases', label: t('nav_clinical_cases'), href: '#clinical-cases' },
    { id: 'education', label: t('nav_education'), href: '#education' },
    { id: 'about', label: t('nav_about'), href: '#about' },
    { id: 'media', label: t('nav_media'), href: '#media' },
  ];

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
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans relative selection:bg-cyan-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <nav className="bg-slate-950/85 backdrop-blur-xl shadow-xl border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex justify-between items-center sticky top-0 z-40 text-white">
         
         {/* Brand Logo */}
         <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <div>
                    <h1 className="text-lg font-black text-white tracking-tight leading-none">Endo<span className="text-cyan-400">Care</span></h1>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">{t('platform_subtitle_short')}</span>
                </div>
            </a>
         </div>
         
         {/* Desktop Navigation Links */}
         <div className="hidden xl:flex items-center space-x-1.5 text-sm font-semibold">
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                    <a 
                        key={item.id}
                        href={item.href}
                        onClick={() => setActiveSection(item.id)}
                        className={`transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer ${
                            isActive
                                ? 'text-cyan-300 font-bold bg-blue-500/20 border border-blue-400/40 shadow-sm shadow-cyan-500/10'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/50'
                        }`}
                    >
                        <span>{item.label}</span>
                        {item.badge && (
                            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full transition-colors ${
                                isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                                    : 'bg-slate-800 text-cyan-300 border border-slate-700'
                            }`}>
                                {item.badge}
                            </span>
                        )}
                    </a>
                );
            })}
         </div>

         {/* Global Search & Right side controls */}
         <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden md:block">
                <GlobalSearch onSelectCourse={setSelectedCourse} onSelectCase={setSelectedCase} />
            </div>

            {/* Language Switcher */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
                <button onClick={() => changeLanguage('uz')} className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${i18n.language === 'uz' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>UZ</button>
                <button onClick={() => changeLanguage('ru')} className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${i18n.language === 'ru' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>RU</button>
                <button onClick={() => changeLanguage('en')} className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${i18n.language === 'en' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>EN</button>
            </div>
            
            {/* Admin Login / Session Timer / Logout */}
            <div className="border-l border-slate-800 pl-3 sm:pl-4 flex items-center gap-2.5">
                {isAdmin && (
                    <AdminSessionBadge 
                        formattedTime={formattedTime}
                        remainingSeconds={remainingSeconds}
                        onExtend={extendSession}
                    />
                )}
                {isAdmin ? (
                    <button onClick={handleLogout} className="text-xs sm:text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer">{t('logout_admin')}</button>
                ) : (
                    <button onClick={() => setShowLoginModal(true)} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">{t('doctor_login')}</button>
                )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="xl:hidden">
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-4 space-y-1.5 text-sm font-bold shadow-2xl sticky top-[69px] z-30 animate-fadeIn backdrop-blur-xl">
              {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                      <a
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                              setActiveSection(item.id);
                              setMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                              isActive
                                  ? 'text-cyan-300 font-bold bg-blue-500/20 border border-blue-400/40'
                                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                          }`}
                      >
                          <span>{item.label}</span>
                          {item.badge && (
                              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                  isActive
                                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                      : 'bg-slate-800 text-cyan-300 border border-slate-700'
                              }`}>
                                  {item.badge} {t('tools')}
                              </span>
                          )}
                      </a>
                  );
              })}
          </div>
      )}

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminSessionModal 
        isOpen={showSessionWarning}
        remainingSeconds={remainingSeconds}
        onExtend={extendSession}
        onLogout={handleLogout}
      />

      {selectedCase && (
          <ClinicalCaseDetailModal
              caseData={selectedCase}
              onClose={() => setSelectedCase(null)}
              isAdmin={isAdmin}
              onEdit={() => {
                  handleEditCase(selectedCase);
                  setSelectedCase(null);
              }}
              onDelete={() => {
                  setSelectedCase(null);
                  handleCaseAddedOrUpdated();
              }}
          />
      )}

      {/* 1. Hero / Landing section */}
      <LandingPage profile={mainProfile} />

      {/* 2. 50 Clinical Calculators Hub (Flagship module) */}
      <CalculatorsHub />

      {/* 3. For Physicians: Guidelines, Protocols & Clinical Algorithms */}
      <ForPhysicians />

      {/* 4. For Patients: Education, Symptoms & Visit Checklist */}
      <ForPatients />

      {/* 5. Clinical Cases Repository */}
      <ClinicalCaseList 
          ref={caseListRef} 
          isAdmin={isAdmin} 
          onEditCase={handleEditCase} 
      />

      {/* 6. Medical Education & Video Courses */}
      <CourseList 
          ref={courseListRef}
          onSelectCourse={setSelectedCourse} 
          isAdmin={isAdmin}
          onEditCourse={handleEditCourse}
      />

      {/* 7. About Doctor / Academic Profile */}
      <main id="about" className="max-w-5xl mx-auto p-4 py-24 flex flex-col items-center scroll-mt-16">
        <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/25 shadow-sm">
                {t('academic_leadership_badge')}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mt-3">{t('about_doctor')}</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">{t('about_doctor_desc')}</p>
        </div>
        
        <div className="w-full">
            {mainProfile ? (
                <DoctorProfile 
                    profile={mainProfile} 
                    isAdmin={isAdmin}
                    onEditClick={handleEditProfile}
                />
            ) : (
                <div className="bg-slate-900/80 p-8 rounded-2xl shadow-xl border border-slate-800 text-center">
                    <p className="text-slate-400 italic">{t('no_profiles')}</p>
                </div>
            )}
        </div>
      </main>

      {/* 8. Media & Social Channels Hub */}
      <MediaHub />

      {/* Admin Control Overlays */}
      {isAdmin && (
          <>
              <AdminPanel onCaseAdded={handleCaseAddedOrUpdated} caseToEdit={caseToEdit} onCloseEdit={() => setCaseToEdit(null)} />
              <AdminCoursePanel 
                  key={courseToEdit ? courseToEdit.id : 'new'}
                  onCourseAdded={handleCourseAddedOrUpdated} 
                  courseToEdit={courseToEdit} 
                  onCloseEdit={() => setCourseToEdit(null)} 
              />
              {profileToEdit && (
                  <AdminProfilePanel 
                      key={profileToEdit.id}
                      profileToEdit={profileToEdit} 
                      onClose={() => setProfileToEdit(null)} 
                      onProfileUpdated={handleProfileUpdated} 
                  />
              )}
          </>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-16 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
             <div className="flex items-center justify-center space-x-2 text-xl font-bold">
                 <span>Endo<span className="text-blue-400">Care</span></span>
                 <span className="text-slate-500 font-normal">|</span>
                 <span className="text-sm font-semibold text-slate-300">{t('footer_platform_name')}</span>
             </div>
             <p className="text-sm text-slate-400 max-w-xl mx-auto">
                 {t('footer_platform_desc')}
             </p>

             {/* Official Social Channels */}
             <div className="flex items-center justify-center gap-4 py-2">
                 <a 
                     href="https://t.me/elbekendokrinolog" 
                     target="_blank" 
                     rel="noreferrer"
                     className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-600 text-sky-400 hover:text-white flex items-center justify-center transition shadow-sm"
                     title="Telegram Channel"
                 >
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                 </a>
                 <a 
                     href="https://www.instagram.com/elbek_endocrinologist?stkn=MXhzd2I1dDRwaHI3cw==" 
                     target="_blank" 
                     rel="noreferrer"
                     className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 text-pink-400 hover:text-white flex items-center justify-center transition shadow-sm"
                     title="Instagram"
                 >
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                 </a>
                 <a 
                     href="https://www.facebook.com/share/1Eqno9NpJu/?mibextid=wwXIfr" 
                     target="_blank" 
                     rel="noreferrer"
                     className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition shadow-sm"
                     title="Facebook"
                 >
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/></svg>
                 </a>
                 <a 
                     href="https://youtube.com/channel/UCUtQT0M8ti9QdDV-R2U_VeA?si=lvKoCgC0rtHzZnFO" 
                     target="_blank" 
                     rel="noreferrer"
                     className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition shadow-sm"
                     title="YouTube Channel"
                 >
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                 </a>
             </div>

             <p className="text-xs text-slate-500">© 2026 {mainProfile?.name || 'Dr. Elbek Mamatkulov'}. {t('all_rights_reserved')}</p>
             
             <div className="text-xs text-slate-500 flex justify-center items-center pt-4 border-t border-slate-800">
                 <span>{t('system_status')}: </span>
                 <div className={`w-2 h-2 rounded-full mx-2 ${healthStatus === 'online' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                 <span className="font-semibold text-slate-400">{t(healthStatus)}</span>
             </div>
         </div>
      </footer>
    </div>
  )
}

export default App