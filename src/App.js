import './App.css';
import React from 'react';
import {faUser, faUserPlus, faSignInAlt, faHome, faSignOutAlt, faUserShield} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Register from './components/Register/register';
class  App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
   currentUser : null,
   currentLocation : window.location.pathname,
   history: createBrowserHistory(),
  };

  }
   render(){
    const {currentUser, currentLocation,history} = this.state;
  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                Shop
              </a>
              <div className="navbar-nav mr-auto">
                <Link to="/home" className={currentLocation == '/home' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faHome}/> Accueil</Link>
              </div>
              <div className="navbar-nav ml-auto">
                <Link to="/register" className={currentLocation == '/register' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faUserPlus}/> S'inscrire</Link>
                <Link to="/login" className={currentLocation == '/login' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faSignInAlt}/> Se connecter</Link>
              </div>
            </nav>
           <div className="container ">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
            </Switch>
          </div>
</div>
     </Router>
  );
  }
}
export default App;