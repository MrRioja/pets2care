import Advert from "../models/Advert";
import imagesView from "../views/images_view";

export default {
  render(advert: Advert) {
    return {
      id: advert.id,
      name: advert.pet_name,
      age: advert.age,
      city: advert.city,
      species: advert.species,
      description: advert.description,
      user_id: advert.user_id,
      created_at: advert.created_at,
      images: imagesView.renderMany(advert.images),
    };
  },

  renderMany(adverts: Advert[]) {
    return adverts.map((advert) => this.render(advert));
  },
};
