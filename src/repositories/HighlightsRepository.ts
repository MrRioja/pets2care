import { EntityRepository, Repository } from "typeorm";
import { Highlight } from "../models/Highlight";

@EntityRepository(Highlight)
class HighlightsRepository extends Repository<Highlight> {}

export { HighlightsRepository };
