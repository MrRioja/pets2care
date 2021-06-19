import Favorite from "../models/Favorite";

export default {
  render(favorite: Favorite) {
    return favorite.advertId;
  },
  renderMany(favorites: Favorite[]) {
    return favorites.map((favorite) => this.render(favorite));
  },
};
