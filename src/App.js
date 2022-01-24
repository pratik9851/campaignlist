
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Home from './components/Home';
import Campaignlist from './components/Campaignlist';

function App() {
  return (
    <div className="App">
      <Router>
       
       <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/campaignlist" element={<Campaignlist/>}/>
       </Routes>

      </Router>
     
    </div>
  );
}

export default App;
