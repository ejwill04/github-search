import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// components
import Search from './components/Search';
import Details from './components/Details';

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
      <Route path='/details'>
        <Details />
      </Route>
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
