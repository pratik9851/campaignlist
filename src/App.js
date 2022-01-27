
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Home from './components/Home';
import Campaignlist from './components/Campaignlist';
import Alldetails from './components/Alldetails';
import { Provider } from 'react-redux';
import {store} from "./redux/store"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
       
       <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/campaignlist" element={<Campaignlist/>}/>
       <Route exact path="/campaignlist/:id" element={<Alldetails/>}/>
       </Routes>

      </Router>
     </Provider>
    </div>
  );
}

export default App;
