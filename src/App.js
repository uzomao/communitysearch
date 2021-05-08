// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import Index from './pages/index/index'

import Context from './context'

import { useState, useMemo } from 'react'

const pages = {
  index: "index"
}

const defaultContextValue = {
  tabs: [
    { page: pages.index, isTabOneActive: true }
  ],
  getPageTabs: (page, tabs) => { return tabs.filter((tab) => tab.page === page)[0] }
}

function App() {

  const [ value, setValue ] = useState(defaultContextValue)

  const providerValue = useMemo(() => ({value, setValue}), [value, setValue])

  return (
    <Router>
      <Switch>
        <Context.Provider value={providerValue}>
          <Route exact path='/'>
            <Index page={pages.index} />
          </Route>
        </Context.Provider>
      </Switch>
    </Router>
  );
}

export default App;
