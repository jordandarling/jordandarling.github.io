import React from 'react';
import { HashRouter, Routes, Route} from 'react-router-dom';
import './css/App.css';
import Home from './Home';
import MasteryData from './MasteryData';
import CurrentMatch from './CurrentMatch';
import Navbar from './Navbar';
import Contact from './Contact';
import Attributions from './Attributions';
import Portfolio from './Portfolio';
import Photography from './Photography';
import TodoApp from './Todo';
import DeadByDaylight from './DeadByDaylight';
import Jordle from './Jordle';



function App() {
  return (
    <HashRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Portfolio" element={<Portfolio/>}/>
        <Route path="/MasteryData" element={<MasteryData/>} />
        <Route path="/CurrentMatch" element={<CurrentMatch/>} />
        <Route path="/Attributions" element={<Attributions/>}/>
        <Route path="/Photography" element={<Photography/>}/>
        <Route path="/Todo" element={<TodoApp/>}/>
        <Route path="/DeadByDaylight" element={<DeadByDaylight/>}/>
        <Route path="/Jordle" element={<Jordle/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
