import Favorite from "../models/Favorite";

export default {
  render(favorite: Favorite) {
    return {
      id: favorite.id,
      advert: favorite.advertId,
      createdAt: favorite.createdAt,
    };
  },
  renderMany(favorites: Favorite[]) {
    return favorites.map((favorite) => this.render(favorite));
  },
};
