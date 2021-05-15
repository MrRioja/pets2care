import Advert from "../models/Advert";
import imagesView from "../views/images_view";

export default {
  render(advert: Advert) {
    return {
      id: advert.id,
      name: advert.name,
      birthDate: advert.birthDate,
      gender: advert.gender,
      type: advert.type,
      breed: advert.breed,
      description: advert.description,
      vaccinated: advert.vaccinated,
      dewormed: advert.dewormed,
      castrated: advert.castrated,
      deficit: advert.deficit,
      userId: advert.userId,
      createdAt: advert.createdAt,
      images: imagesView.renderMany(advert.images),
    };
  },

  renderMany(adverts: Advert[]) {
    return adverts.map((advert) => this.render(advert));
  },
};
