import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
