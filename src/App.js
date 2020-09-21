import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// components
import Search from './components/Search';

// styles
import './App.css';

const Nav = () => {
  return (
    <nav>
      <div>
        <Link to='/'>Search</Link>
      </div>
    </nav>
  )
}

const Routes = () => {
  return (
    <Switch>
      <Route path="/">
        <Search />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
