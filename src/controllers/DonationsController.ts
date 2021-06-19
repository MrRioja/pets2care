import { Request, Response } from "express";
import { getConnection, getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import Donation from "../models/Donation";

import { AdvertsRepository } from "../repositories/AdvertsRepository";
import { DonationsRepository } from "../repositories/DonationsRepository";
import { stringToBoolean } from "../utils/stringToBoolean";

class DonationsController {
  async create(req: Request, res: Response) {
    const { id, userId } = req.params;
    const createdAt = Date.now();

    const donationsRepository = getCustomRepository(DonationsRepository);
    const advertsRepository = getCustomRepository(AdvertsRepository);

    const donationExists = await donationsRepository.findOne({
      where: { advertId: parseInt(id), userId: parseInt(userId) },
    });

    if (donationExists) {
      return res.json({
        message: "Solicitação de contato já foi enviada para o dono do anúncio",
      });
    }

    const advert = await advertsRepository.findOne(id, {
      where: { isActive: true },
      relations: ["images", "userId"],
    });

    if (!advert) {
      return res
        .status(400)
        .json({ message: new AppError("Anúncio não encontrado").message });
    }

    const data = {
      userId: parseInt(userId),
      ownerId: advert.userId.id,
      advertId: parseInt(id),
      accepted: undefined,
      createdAt,
    };

    const donation = await donationsRepository.create(data);
    await donationsRepository.save(donation);

    return res.json({
      message: "Solicitação de contato enviada para o dono do anúncio",
      donation: donation,
    });
  }

  async index(req: Request, res: Response) {
    const { userId } = req.params;

    const donations = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Donation, "donations")
      .where("userId = :id", { id: parseInt(userId) })
      .orWhere("ownerId = :id", { id: parseInt(userId) })
      .execute();

    return res.json(donations);
  }

  async accept(req: Request, res: Response) {
    const { id } = req.params;
    const accepted = await stringToBoolean(req.body.accept);

    const donationsRepository = getCustomRepository(DonationsRepository);

    await donationsRepository.update(id, { accepted });

    const donation = await donationsRepository.findOne(id);

    return res.json(donation);
  }
}

export { DonationsController };
