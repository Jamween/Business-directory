import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import NavigationBar from './components/NavigationBar'; 

import Read from './components/Read'; 
import Create from './components/Create'; 
import Edit from './components/Edit'; 

// Main App component for routing
function App() {
  return (
    <Router>
      <NavigationBar /> {/* Navigation bar visible on all pages */}
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Read />} />
        <Route path="/read" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App; 
