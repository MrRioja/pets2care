import { Request, Response } from "express";
import { getConnection, getCustomRepository, In } from "typeorm";
import * as Yup from "yup";

import advertView from "../views/adverts_view";

import extractIds from "../utils/extractIds";
import deleteImages from "../utils/deleteImages";
import stringToBoolean from "../utils/stringToBoolean";

import { AdvertsRepository } from "../repositories/AdvertsRepository";
import { ImagesRepository } from "../repositories/ImagesRepository";
import Image from "../models/Image";
import adverts_view from "../views/adverts_view";

class AdvertsController {
  async index(req: Request, res: Response) {
    const advertsRepository = getCustomRepository(AdvertsRepository);

    const adverts = await advertsRepository.find({
      where: { isActive: true },
      relations: ["images"],
    });

    return res.json(advertView.renderMany(adverts));
  }

  async indexByUser(req: Request, res: Response) {
    const { userId } = req.params;

    const advertsRepository = getCustomRepository(AdvertsRepository);

    const adverts = await advertsRepository.find({
      where: { userId: parseInt(userId), isActive: true },
      relations: ["images"],
    });

    return res.json(advertView.renderMany(adverts));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const advertsRepository = getCustomRepository(AdvertsRepository);

    const advert = await advertsRepository.findOneOrFail(id, {
      where: { isActive: true },
      relations: ["images"],
    });

    return res.json(advertView.render(advert));
  }

  async create(req: Request, res: Response) {
    const createdAt = Date.now();
    const {
      name,
      birthDate,
      gender,
      type,
      breed,
      description,
      userId,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
    } = req.body;

    const advertsRepository = getCustomRepository(AdvertsRepository);
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const [vaccinated, dewormed, castrated, deficit, isActive] =
      await stringToBoolean([
        req.body.vaccinated,
        req.body.dewormed,
        req.body.castrated,
        req.body.deficit,
        req.body.isActive,
      ]);

    const data = {
      name,
      birthDate,
      gender,
      type,
      breed,
      description,
      vaccinated,
      dewormed,
      castrated,
      deficit,
      isActive,
      userId,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      createdAt,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birthDate: Yup.string()
        .required()
        .matches(/\d{4}-\d{2}-\d{2}/gm),
      gender: Yup.string().required(),
      type: Yup.string().required(),
      breed: Yup.string().required(),
      description: Yup.string().max(1000),
      vaccinated: Yup.boolean(),
      dewormed: Yup.boolean(),
      castrated: Yup.boolean(),
      deficit: Yup.boolean(),
      isActive: Yup.boolean(),
      userId: Yup.number().required(),
      cep: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().nullable(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
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

    return res.status(201).json(adverts_view.render(advert));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const requestImages = req.files as Express.Multer.File[];

    const advertsRepository = getCustomRepository(AdvertsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const oldImages = await imagesRepository.find({
      select: ["path"],
      where: { advert: id },
    });

    deleteImages(oldImages);
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Image)
      .where("advert_id = :id", { id: id })
      .execute();

    const newImages = requestImages.map((image) => {
      return { path: image.filename };
    });

    newImages.map(async (image) => {
      await queryRunner.query(
        `insert into images values (null, '${image.path}', ${id})`
      );
    });

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
    await advertsRepository.delete(id);

    return res.json({ message: "Deletado com sucesso!" });
  }

  async deleteAll(req: Request, res: Response) {
    const { userId } = req.params;

    const advertsRepository = getCustomRepository(AdvertsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const adverts = await advertsRepository.find({
      select: ["id"],
      where: { userId: parseInt(userId) },
    });

    const ids = extractIds(adverts);

    const images = await imagesRepository.find({
      select: ["path"],
      where: { advert: In(ids) },
    });

    deleteImages(images);
    await advertsRepository.delete(ids);

    return res.json({ message: "Deletados com sucesso!" });
  }
}

export { AdvertsController };
