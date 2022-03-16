import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './css/App.css';
import Home from './Home';
import MasteryData from './MasteryData';
import CurrentMatch from './CurrentMatch';
import Navbar from './Navbar';



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/Home" element={<Home/>} />
        <Route path="/MasteryData" element={<MasteryData/>} />
        <Route path="/CurrentMatch" element={<CurrentMatch/>} />
      </Routes>
    </Router>
  );
}

export default App;
