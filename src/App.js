import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Pizza from "./components/Pizza";
import Home from "./components/Home";

function App () {
 return (
   <Router>
     <div className="App">
     </div>

     <nav className="navigation">
       <h1>Lambda Eats</h1>
      <div className="nav-link">
       <Link to="/">
         <button name='home'>Home</button>
       </Link>

     <br />       
     <Link to="/pizza">
       <button name='order'>Pizza Order</button>
     </Link>
     </div>
     </nav>

     <div className="App-header">
       <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/pizza" component={Pizza} />
         <Route path="/order"
         render={props => {
           return null
         }}
         />
       </Switch>
     </div>
     </Router>

 );
};
export default App;
