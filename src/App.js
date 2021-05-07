// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import Index from './pages/index/index'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
