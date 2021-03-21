import Advert from "../models/Advert";

export default function extractIds(adverts: Advert[]) {
  let ids: number[] = [];

  adverts.map((advert) => {
    ids.push(advert.id);
  });

  return ids;
}
