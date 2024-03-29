import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import VerificationPage from './pages/verification.page';
import SuccessPage from './pages/success.page';

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<VerificationPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
