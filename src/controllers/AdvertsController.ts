import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import * as Yup from "yup";

import advertView from "../views/adverts_view";
import extractIds from "../utils/extractIds";
import deleteImages from "../utils/deleteImages";
import { AdvertsRepository } from "../repositories/AdvertsRepository";
import { ImagesRepository } from "../repositories/ImagesRepository";

class AdvertsController {
  async index(req: Request, res: Response) {
    const advertsRepository = getCustomRepository(AdvertsRepository);

    const adverts = await advertsRepository.find({
      relations: ["images"],
    });

    return res.json(advertView.renderMany(adverts));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const advertsRepository = getCustomRepository(AdvertsRepository);

    const advert = await advertsRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(advertView.render(advert));
  }

  async create(req: Request, res: Response) {
    const createdAt = Date.now();
    const { name, age, place, type, description, userId, userName } = req.body;
    const advertsRepository = getCustomRepository(AdvertsRepository);
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      age,
      place,
      type,
      description,
      userId,
      userName,
      createdAt,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number().required(),
      place: Yup.string().required(),
      type: Yup.string().required().max(300),
      description: Yup.string().required(),
      userId: Yup.number().required(),
      userName: Yup.string().required(),
      createdAt: Yup.number().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const advert = advertsRepository.create(data);

    await advertsRepository.save(advert);

    return res.status(201).json(advert);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const advertsRepository = getCustomRepository(AdvertsRepository);

    const advert = await advertsRepository.findOneOrFail(id);

    advertsRepository.merge(advert, req.body);

    const advertUpdated = await advertsRepository.save(advert);

    return res.json(advertUpdated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const advertsRepository = getCustomRepository(AdvertsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const images = await imagesRepository.find({
      select: ["path"],
      where: { advert: id },
    });

    deleteImages(images);
    const advert = await advertsRepository.delete(id);

    return res.json({ message: "Deletado com sucesso!" });
  }

  async deleteAll(req: Request, res: Response) {
    const { userId } = req.params;

    const advertsRepository = getCustomRepository(AdvertsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const adverts = await advertsRepository.find({
      select: ["id"],
      where: { userId: userId },
    });

    const ids = extractIds(adverts);

    const images = await imagesRepository.find({
      select: ["path"],
      where: { advert: In(ids) },
    });

    deleteImages(images);
    const advert = await advertsRepository.delete({ userId: parseInt(userId) });

    return res.json({ message: "Deletados com sucesso!", advert });
  }
}

export { AdvertsController };
