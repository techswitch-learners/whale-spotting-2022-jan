import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/homepage/Home";
import { Navbar } from "./components/navbar/Navbar";
import { LoginManager } from "./components/login/LoginManager";
import { Footer } from "./components/footer/Footer";
import { CreateSightingPage } from "./components/createSightingPage/CreateSightingPage";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/create-sighting" component={CreateSightingPage} />
    </Switch>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <LoginManager>
        <Navbar />
        <main>
          <Routes />
        </main>
        <Footer />
      </LoginManager>
    </Router>
  );
};

export default App;
