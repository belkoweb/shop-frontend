import React, { Component } from 'react'
import Produit from "../../models/Produit";
import { User } from '../../models/User';
import userService from '../../services/user.service';
import ProduitService from '../../services/produit.service';
import { Favoris } from '../../models/Favoris';
class Home extends Component {

    constructor(props){
    super(props);
    this.state= {
        produits : [],
        errorMessage : '',
        infoMessage : '',
        empty:false,
        currentUser : new User()
    };
    
      }
        addToFavoris = produit =>{
          this.setState({errorMessage:""}); 
          if(!this.state.currentUser){
              this.props.history.push("/login");
              return;
          }
          let favoris = new Favoris(this.state.currentUser,produit);
          ProduitService.saveFavoris(favoris).then(favoris=>{
             this.setState({infoMessage:"Produit ajouté avec succes"});
            
          }).catch(e=>{
                  console.log(e);
                       this.setState({errorMessage:"Produit déjà ajouté à vos favoris"}); 
                   
          })
        }
      componentDidMount = ()=>{
          userService.currentUser._subscribe(data=>{
              this.setState({currentUser:data});
          });
          this.setState({loading:true});
        ProduitService.findAllProducts().then(produits=>{
          if(produits.length == 0){
            this.setState({empty:true});
          }
            this.setState({produits:produits.data});
        })
      }
    render() {
        const {produits,errorMessage,infoMessage}= this.state;
        return(
       <div class="container">

        <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class=""></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1" class=""></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2" class="active"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item">
              <img class="d-block img-fluid" src="images/slide1.jpg" alt="First slide"/>
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="images/slide2.jpg" alt="Second slide"/>
            </div>
            <div class="carousel-item active">
              <img class="d-block img-fluid" src="images/slide3.jpg" alt="Third slide"/>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
         {infoMessage &&
        <div className="alert alert-success">
          <strong>Succès ! </strong> {infoMessage}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }
      {errorMessage &&
        <div className="alert alert-danger">
          <strong>Erruer ! </strong> {errorMessage}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }
         {produits.loading && <em> Loading products...</em>}
         {this.state.empty ? <div class="text-center"><h1 >Aucun Produit trouvé</h1></div> :
        <div class="row">
              {produits.map((produit) =>
                       <div class="col-lg-4 col-md-6">
            <div class="card h-75">
              <a href="#"><img class="card-img-top" src={produit.image} alt=""/></a>
              <div class="card-body mb-5">
                <h4 class="card-title">
                  <a href="#">{produit.libelle}</a>
                </h4>
                <h5>{produit.prix} €</h5>
              <p class="card-text mb-5">{produit.description}</p>
              </div>
            <button type="button" class="btn btn-secondary shadow w-100" onClick={()=>this.addToFavoris(produit)}>Ajouter aux favoris</button>
            </div>
          </div>
            )
            }
          </div> }
      </div>
        )
    }

}
export default Home;