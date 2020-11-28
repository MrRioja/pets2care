import Advert from "../models/Advert";
import imagesView from "../views/images_view";

export default {
  render(advert: Advert) {
    return {
      id: advert.id,
      userId: advert.userId,
      userName: advert.userName,
      createdAt: advert.createdAt,
      name: advert.name,
      place: advert.place,
      images: imagesView.renderMany(advert.images),      
      age: advert.age,
      type: advert.type,
      description: advert.description,
    };
  },

  renderMany(adverts: Advert[]) {
    return adverts.map((advert) => this.render(advert));
  },
};
