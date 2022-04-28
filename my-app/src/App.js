import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './css/App.css';
import Home from './Home';
import MasteryData from './MasteryData';
import CurrentMatch from './CurrentMatch';
import Navbar from './Navbar';
import Contact from './Contact';



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/MasteryData" element={<MasteryData/>} />
        <Route path="/CurrentMatch" element={<CurrentMatch/>} />
      </Routes>
    </Router>
  );
}

export default App;
