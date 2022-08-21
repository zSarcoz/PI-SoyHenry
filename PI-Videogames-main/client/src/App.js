import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import AddGame from "./components/AddGame";
import GameDetail from "./components/GameDetail";
import ErrorNotFound from "./components/ErrorNotFound";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
            <Route component={ErrorNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
