import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import { MainLayout } from './components/navigation/MainLayout';

// Pages
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import PerformancePage from './pages/PerformancePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import FinancialPage from './pages/FinancialPage';
import MessagesMenuPage from './pages/MessagesMenuPage';
import MessagesPage from './pages/MessagesPage';
import TutoriaPage from './pages/TutoriaPage';
import AtendimentoPage from './pages/AtendimentoPage';
import AvisosPage from './pages/AvisosPage';
import CalendarPage from './pages/CalendarPage';
import StudentCardPage from './pages/StudentCardPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import DisciplineDetailsPage from './pages/DisciplineDetailsPage';
import StubLoadingPage from './pages/StubLoadingPage';

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected Routes with MainLayout (Bottom Navigation) */}
        <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        {/* Detail Pages (without bottom navigation) */}
        <Route
          path="/financial"
          element={isAuthenticated ? <FinancialPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/messages"
          element={isAuthenticated ? <MessagesMenuPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/messages/chat"
          element={isAuthenticated ? <MessagesPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/messages/atendimento"
          element={isAuthenticated ? <AtendimentoPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/messages/tutoria"
          element={isAuthenticated ? <TutoriaPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/messages/avisos"
          element={isAuthenticated ? <AvisosPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/calendar"
          element={isAuthenticated ? <CalendarPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/student-card"
          element={isAuthenticated ? <StudentCardPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/course/:courseId"
          element={isAuthenticated ? <CourseDetailsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/discipline/:disciplineId"
          element={isAuthenticated ? <DisciplineDetailsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/stub/:title"
          element={isAuthenticated ? <StubLoadingPage /> : <Navigate to="/login" replace />}
        />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
