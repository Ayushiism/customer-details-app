import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import View from './components/View';
import Update from './components/Update'
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Router>
      <Home/>
      <Routes>
        <Route exact path= "/" element={<View/>}/>
        <Route exact path='/Update/:customer_id' element={<Update/>}/>
        <Route exact path='/Create/' element={<Create/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
