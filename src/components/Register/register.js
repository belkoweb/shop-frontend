import React, { Component } from 'react';
import { User } from '../../models/User';
import UserService from '../../services/user.service';
import './register.css';
class Register extends Component {
   constructor(props){
    super(props);
    this.state= {
   user: new User(1,"yassir","acaf","yassirox","yassirok@gmail.com","1234","zzzz"),
          submitted: false,
          loading: false,
          errorMessage: ''
    };

      }
          handleChange = (e)=>{
     var {name, value} = e.target;
    var user = this.state.user;
    user[name] = value;
    this.setState({user: user});
    }
    handleRegister = (e)=>{
      e.preventDefault();
      this.setState({submitted:true});
      const user = this.state.user;
      console.log(user);
      if(!(user.password && user.nom && user.login && user.prenom && user.password && user.email)) return;
      this.setState({loading:true});
      
      UserService.register(user).then(data=>{
        this.props.history.push("/login");
        console.log(data);
      }).catch(e=>{
        if(e.response.status == 409) {
          this.setState({errorMessage:"Login non dosponible",loading:false});
        }else{
          this.setState({errorMessage:"Erreur inattendue...",loading:false})
        }
        console.log(e);
      })
    }
    render() {
        const { user, submitted, loading, errorMessage } = this.state;
        return(
          <div className="col-md-12">
        <div className="card card-container">
          <img id="profile-id" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
          {errorMessage &&
            <div className="alert alert-danger" role="alert">
            <strong>Error! </strong> {errorMessage}
            </div>
          }
          <form name="form" onSubmit={(e) => this.handleRegister(e)}>
              <div className={'form-group' + (submitted && user.nom ? 'has-error': '')}>
              <label htmlFor="name">Nom</label>
              <input type="text" className="form-control" name="nom" value={user.nom} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !user.nom &&
                <div className="alert alert-danger" role="alert">nom est obligatoire.</div>
              }
              </div>
                     <div className={'form-group' + (submitted && user.prenom ? 'has-error': '')}>
              <label htmlFor="password">prenom</label>
              <input type="text" className="form-control" name="prenom" value={user.prenom} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !user.prenom &&
                <div className="alert alert-danger" role="alert">prenom  est obligatoire.</div>
              }
              </div>
              <div className={'form-group' + (submitted && user.login ? 'has-error': '')}>
              <label htmlFor="username">Login</label>
          <input type="text" className="form-control" name="login" value={user.login} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !user.login &&
                <div className="alert alert-danger" role="alert">Login est obligatoire.</div>
              }
              </div>
                 <div className={'form-group' + (submitted && user.email ? 'has-error': '')}>
              <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !user.email &&
                <div className="alert alert-danger" role="alert">email est obligatoire.</div>
              }
              </div>

              <div className={'form-group' + (submitted && user.password ? 'has-error': '')}>
              <label htmlFor="password">Mot de passe</label>
              <input type="password" className="form-control" name="password" value={user.password} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !user.password &&
                <div className="alert alert-danger" role="alert">mot de passe  est obligatoire.</div>
              }
              </div>
         
              <div className="form-group mt-3">
                <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" disabled={loading}>S'inscrire</button>
              </div>
          </form>
        </div>
      </div>

        )
    }

}
export default Register;