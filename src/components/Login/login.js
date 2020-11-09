import React, { Component } from 'react'
import { User } from '../../models/User';
import './login.css';
class Login extends Component {
  constructor(props){
    super(props);
    this.state= {
   user: new User(1,"yassir","acaf","yassirox","yassirok@gmail.com","1234","zzzz"),
          submitted: false,
          loading: false,
          errorMessage: ''
    };
      }
      handleChange = e=>{
 var {name, value} = e.target;
    var user = this.state.user;
    user[name] = value;
    this.setState({user: user});
      }
      handleLogin = e=>{
 e.preventDefault();
      this.setState({submitted:true});
      const user = this.state.user;
      console.log(user);
      if(!(user.password && user.login)) return;
      this.setState({loading:true});
      }
    render() {
          const { user, submitted, loading, errorMessage } = this.state;
        return(
<div className=" col-md-12">
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            {errorMessage &&
              <div className="alert alert-danger" role="alert">
                <strong>Error! </strong> {errorMessage}
              </div>
            }
            <form name="form" onSubmit={(e) => this.handleLogin(e)}>
                <div className={'form-group' + (submitted && !user.login ? ' has-error' : '')}>
                    <label htmlFor="username">Login</label>
                    <input type="text" className="form-control" name="username" value={user.login} onChange={(e) => this.handleChange(e)} />
                    {submitted && !user.login &&
                        <div className="help-block">Login Obligatoire</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' :'')}>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={(e) => this.handleChange(e)} />
                    {submitted && !user.password &&
                        <div className="help-block">Mot de passe Obligatoire</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-primary btn-block  btn-signin form-submit-button" disabled={loading}>Connexion</button>
                </div>
            </form>
            </div>
        </div>


        )
    }

}
export default Login;