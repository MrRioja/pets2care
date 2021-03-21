import { EntityRepository, Repository } from "typeorm";
import { Advert } from "../models/Advert";

@EntityRepository(Advert)
class AdvertsRepository extends Repository<Advert> {}

export { AdvertsRepository };
