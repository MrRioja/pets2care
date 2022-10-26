import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AdvertsRepository } from "../repositories/AdvertsRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import adverts_view from "../views/adverts_view";
import users_view from "../views/users_view";

class SpotlightsController {
  async getUsers(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const usersSpotlight = await usersRepository.find({
      where: { isSpotlight: true },
    });

    return res.json(users_view.renderMany(usersSpotlight));
  }

  async getAdverts(req: Request, res: Response) {
    const advertsRepository = getCustomRepository(AdvertsRepository);

    const advertsSpotlight = await advertsRepository.find({
      where: { isActive: true, isSpotlight: true },
      relations: ["images"],
    });

    return res.json(adverts_view.renderMany(advertsSpotlight));
  }
}

export { SpotlightsController };
