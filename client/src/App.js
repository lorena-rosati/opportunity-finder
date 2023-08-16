import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home';
import {Auth} from './pages/auth';
import {CreateOpp} from './pages/create-opp';
import {SavedOps} from './pages/saved-ops';
import {Navbar} from "./components/navbar"
import {Footer} from "./components/footer";

const style = {
  page: "flex flex-col"
}

function App() {
  return (
    <div className={style.page}>
      <Router>
        <div><Navbar/></div>
        <div><Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/auth" element={<Auth />}/> 
          <Route path="/create-opp" element={<CreateOpp />}/> 
          <Route path="/saved-ops" element={<SavedOps />}/> 
        </Routes></div>
        <div><Footer/></div>
      </Router>
    </div>
  );
}

export default App;
