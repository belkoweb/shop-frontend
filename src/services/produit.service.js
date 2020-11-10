import axios from 'axios';
const API_URL = 'http://localhost:8080/shop-api/';
 class ProduitService {
findAllProducts() {
    return axios.get(API_URL + "produit/",
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
saveFavoris(favoris) {
    return axios.post(API_URL + 'favoris/', JSON.stringify(favoris),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
  findAllFavorisByUser(user){
    console.log(user);
        return axios.post(API_URL + 'favoris/findAll', JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
   deleteFavoris(favoris){
        return axios.post(API_URL + 'favoris/delete', JSON.stringify(favoris),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
  }
export default new ProduitService();