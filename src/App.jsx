import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import DataProvider from './context/DataContext';
import Chatbot from './components/Chatbot';

// Lazy load components
const EducationCenter = lazy(() => import('./components/EducationCenter'));
const InequalityStats = lazy(() => import('./components/InequalityStats'));
const FacultyAssignment = lazy(() => import('./components/FacultyAssignment'));
const Feedback = lazy(() => import('./components/Feedback'));
const Session = lazy(() => import('./components/Session'));

const App = () => {
  const routes = [
    { path: "/", element: <EducationCenter /> },
    { path: "/stats", element: <InequalityStats /> },
    { path: "/faculty", element: <FacultyAssignment /> },
    { path: "/feedback", element: <Feedback /> },
    { path: "/session", element: <Session /> },
  ];

  return (
    <DataProvider>
      <Router>
        <RootLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </Suspense>
          <Chatbot />
        </RootLayout>
      </Router>
    </DataProvider>
  );
};

export default App;
