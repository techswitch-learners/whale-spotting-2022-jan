import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/homepage/Home";
import { Navbar } from "./components/navbar/Navbar";
import { LoginManager } from "./components/login/LoginManager";
import { Footer } from "./components/footer/Footer";
import { CreateSightingPage } from "./components/createSightingPage/CreateSightingPage";
import { CreateUser, SignUpForm } from "./Pages/SignUp/SignUp";
import { Login } from "./components/login/Login";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/sign-up">
        <CreateUser />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/sightings/create">
        <CreateSightingPage />
      </Route>
      <Route path="/">
        <Home />
      </Route>
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
