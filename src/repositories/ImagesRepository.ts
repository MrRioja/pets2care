import { EntityRepository, Repository } from "typeorm";
import { Image } from "../models/Image";

@EntityRepository(Image)
class ImagesRepository extends Repository<Image> {}

export { ImagesRepository };
