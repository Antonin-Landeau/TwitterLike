import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landingpage from './Component/Landingpage';
import Signup from './Component/Signup';
import Signin from './Component/Signin';
import Feed from './Component/Feed';
import Navbar from './Component/Navbar';

function App() {

  return (
      <Router>
    <div className="App">
      <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Landingpage}></Route>
          <Route path="/Feed"><Feed /></Route>
          <Route path="/SignUp" component={Signup}></Route>
          <Route path="/SignIn"><Signin /></Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
