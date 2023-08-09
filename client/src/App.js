import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home';
import {Auth} from './pages/auth';
import {CreateOpp} from './pages/create-opp';
import {SavedOps} from './pages/saved-ops';
import {Navbar} from "./components/navbar"

//in route: element is component we want to render, path is a slash because this is home 

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/auth" element={<Auth />}/> 
          <Route path="/create-opp" element={<CreateOpp />}/> 
          <Route path="/saved-ops" element={<SavedOps />}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
