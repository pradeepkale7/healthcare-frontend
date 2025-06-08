import React, { useState } from 'react';
import { Box } from "@mui/material";
import AnalyticsPage from './pages/AnalyticsPage';
import HomePage from './Pages/HomePage';
import Sidebar from './components/SideBar';
import UploadedFiles from './Pages/UploadedFilesPage';

const App = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'fileReport':
        return <UploadedFiles />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </Box>
  );
};

export default App;