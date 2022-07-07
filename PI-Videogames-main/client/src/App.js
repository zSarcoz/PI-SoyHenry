import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import AddGame from "./components/AddGame";
import GameDetail from "./components/GameDetail";
import ErrorNotFound from "./components/ErrorNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/videogames/create">
            <AddGame />
          </Route>
          <Route exact path="/videogame/:id">
            <GameDetail />
          </Route>
          <Route path= '*' component = {ErrorNotFound}/>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
