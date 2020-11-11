import './App.css';
import React from 'react';
import {faUser, faUserPlus, faSignInAlt, faHome, faSignOutAlt, faUserShield, faHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Favoris from './components/Favoris/favoris';
import userService from './services/user.service';
class  App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
   currentUser : null,
   currentLocation : window.location.pathname,
   history: createBrowserHistory(),
   currencies : ["EUR","USD"],
   selectedElement:"EUR"
  };

  }
  componentDidMount = ()=>{
    userService.currentUser.subscribe(data=>{
    this.setState({currentUser:data});
    });
    
  }
  componentWillMount = ()=>{
     this.unlisten = this.state.history.listen((location, action) => {
      this.setState({currentLocation: location.pathname})
    });
  }
  componentWillUnmount = ()=>{
    this.unlisten();
  }
  logOut = ()=>{
    userService.logOut().then(data=>{
     if(data){
        this.state.history.push("/login");
     }
    }).catch(e=>{
      console.log(e);
    })
  }
  
  switchCurrency = (element)=>{
     //localStorage.setItem('currency', JSON.stringify(element));
    let array = this.state.currencies;
    const index = array.findIndex(elem => elem == element);
    array.splice(index,1);
    array.unshift(element);
    this.setState({currencies:array,selectedElement:element});
  }
   render(){
    const {currentUser, currentLocation,history} = this.state;
    const currencies = this.state.currencies;
  return (
    <Router history={history}>
      <div>
       {this.state.currentUser && 
              <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                Shopix
              </a>
              <div className="navbar-nav mr-auto">
                <Link to="/accueil" className={currentLocation == '/accueil' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faHome}/> Accueil</Link>
                <Link to="/favoris" className={currentLocation == '/favoris' ? 'nav-item nav-link ': 'nav-item nav-link'}><FontAwesomeIcon icon={faHeart}/> Favoris</Link>
                                  <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
    <li class="nav-item dropdown">
      <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {this.state.selectedElement}
      </a>
       <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
            {currencies.filter(elem=>elem != this.state.selectedElement).map((element) => (
           <a class="dropdown-item" onClick={()=>{this.switchCurrency(element)}} >{element}</a>
      ))}
      </div>
    </li>
  </ul>
              </div>

              <div className="navbar-nav ml-auto">
                <a class="nav-item nav-link btn " onClick={()=>{this.logOut()}} ><FontAwesomeIcon icon={faSignInAlt}/> Se déconnecter</a>
              </div>
            </nav>}
            {!this.state.currentUser &&
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                 <a className="navbar-brand" href="/">
              Shopix
              </a>
              <div className="navbar-nav mr-auto">
                <Link to="/accueil" className={currentLocation == '/home' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faHome}/> Accueil</Link>
                <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
    <li class="nav-item dropdown">
      <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {this.state.selectedElement}
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
            {currencies.filter(elem=>elem != this.state.selectedElement).map((element) => (
           <a class="dropdown-item" onClick={()=>{this.switchCurrency(element)}} >{element}</a>
      ))}
      </div>
    </li>
  </ul>
              </div>

              <div className="navbar-nav ml-auto">
                <Link to="/register" className={currentLocation == '/register' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faUserPlus}/> S'inscrire</Link>
                <Link to="/login" className={currentLocation == '/login' ? 'nav-item nav-link active': 'nav-item nav-link'}><FontAwesomeIcon icon={faSignInAlt}/> Se connecter</Link>
              </div>
            </nav>
          }
           <div className="container ">
            <Switch>
              <Route exact path="/" component={() => <Home selectedElement={this.state.selectedElement} />}  />
              <Route exact path="/accueil" component={() => <Home  selectedElement={this.state.selectedElement} />} />
               <Route exact path="/favoris" component={Favoris}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
            </Switch>
          </div>
</div>
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright 2020 &copy; Shopix</p>
    </div>
  </footer>
     </Router>
  );
  }
}
export default App;