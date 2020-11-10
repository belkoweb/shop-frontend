import React, { Component } from 'react'
import { User } from '../../models/User';
import produitService from '../../services/produit.service';
import userService from '../../services/user.service';
class Favoris extends Component {

    constructor(props){
    super(props);
    this.state= {
        favoris: [],
        currentUser:userService.currentUserValue
    };
      }
      handleDelete = (fav)=>{
          let favs = this.state.favoris;
          let itemIndex = favs.findIndex(item => item == fav);
    if(itemIndex !== -1){
      favs.splice(itemIndex, 1);
      this.setState({favoris: favs});
      produitService.deleteFavoris(fav).then(data=>{
          console.log(data);
      });
      }
    }
      componentDidMount= ()=>{
            produitService.findAllFavorisByUser(this.state.currentUser).then(favoris=>{
                this.setState({favoris:favoris.data})
           }).catch(e=>{
               console.log(e);
           })
           
    }

    render() {
        const favoris = this.state.favoris;
        return(
             <table class="table table-hover mt-4">
    <thead>
      <tr>
        <th>Id</th>
        <th>Image</th>
        <th>Libelle</th>
       <th>Prix</th>
       <th>Action</th>
      </tr>
    </thead>
    <tbody>
          {favoris.map((fav) =>
             <tr>
          <td>{fav.id}</td>
        <td>{fav.produit.libelle}</td>
        <td>{fav.produit.libelle}</td>
        <td>{fav.produit.prix}</td>
        <td><button class="btn btn-primary" onClick={()=>{this.handleDelete(fav)}}>supprimer</button></td>
      </tr>
          )}
   
    </tbody>
  </table>
        );
    }

}
export default Favoris;