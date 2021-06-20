import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { AdvertsRepository } from "../repositories/AdvertsRepository";
import { FavoritesRepository } from "../repositories/FavoritesRepository";
import adverts_view from "../views/adverts_view";

class FavoritesController {
  async create(req: Request, res: Response) {
    const { id, userId } = req.params;
    const createdAt = Date.now();

    const favoritesRepository = getCustomRepository(FavoritesRepository);

    let favorite = await favoritesRepository.find({
      where: { advertId: id, userId: userId },
    });

    if (favorite.length === 0) {
      const favorite = favoritesRepository.create({
        userId,
        createdAt,
        advertId: parseInt(id),
      });

      await favoritesRepository.save(favorite);

      return res.status(201).json(favorite);
    } else {
      return res.json({ message: "Anúncio já foi favoritado pelo usuário." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id, userId } = req.params;

    const favoritesRepository = getCustomRepository(FavoritesRepository);

    let [favorite] = await favoritesRepository.find({
      where: { advertId: id, userId: userId },
    });

    if (favorite) {
      await favoritesRepository.delete(favorite.id);

      return res.json({
        message: "Anúncio foi removido dos favoritos do usuário.",
      });
    } else {
      return res.json({
        message: "Anúncio não está nos favoritos do usuário.",
      });
    }
  }

  async index(req: Request, res: Response) {
    const { userId } = req.params;

    const favoritesRepository = getCustomRepository(FavoritesRepository);

    const favorites = await favoritesRepository.find({
      where: { userId: userId },
      relations: ["advertId"],
      loadRelationIds: true,
    });

    let ids: number[] = [];

    favorites.forEach((favorite) => ids.push(favorite.advertId));

    const advertsRepository = getCustomRepository(AdvertsRepository);

    const adverts = await advertsRepository.find({
      where: { id: In(ids) },
      relations: ["images", "userId"],
    });

    return res.json(adverts_view.renderMany(adverts));
  }
}

export { FavoritesController };
