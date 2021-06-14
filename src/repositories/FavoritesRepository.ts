import { EntityRepository, Repository } from "typeorm";
import { Favorite } from "../models/Favorite";

@EntityRepository(Favorite)
class FavoritesRepository extends Repository<Favorite> {}

export { FavoritesRepository };
