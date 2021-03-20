import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { resolve } from "path";
import fs from "fs";
import * as Yup from "yup";

import advertView from "../views/adverts_view";
import Advert from "../models/Advert";
import Image from "../models/Image";

export default {
  async index(req: Request, res: Response) {
    const advertsRepository = getRepository(Advert);

    const adverts = await advertsRepository.find({
      relations: ["images"],
    });

    return res.json(advertView.renderMany(adverts));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const advertsRepository = getRepository(Advert);

    const advert = await advertsRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(advertView.render(advert));
  },

  async create(req: Request, res: Response) {
    const createdAt = Date.now();
    const { name, age, place, type, description, userId, userName } = req.body;
    const advertsRepository = getRepository(Advert);
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
  },

  //TODO: tem que ser igualzinho ao create, inclusive recebendo as images
  async update(req: Request, res: Response) {
    let { userName, name, place, age, type, description } = req.body;
    const { id } = req.params;

    const advertsRepository = getRepository(Advert);

    const advert = await advertsRepository.findOneOrFail(id);

    advert.userName = userName === undefined ? advert.userName : userName;
    advert.name = name === undefined ? advert.name : name;
    advert.age = age === undefined ? advert.age : age;
    advert.place = place === undefined ? advert.place : place;
    advert.type = type === undefined ? advert.type : type;
    advert.description =
      description === undefined ? advert.description : description;

    await advertsRepository.update(id, req.body);

    return res.json(advert);
  },

  //TODO: quando dá o delete tem que apagar as images associadas do banco
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const advertsRepository = getRepository(Advert);
    const imagesRepository = getRepository(Image);

    const images = await imagesRepository.find({
      select: ["path"],
      where: { advert: id },
    });

    images.forEach((image) => {
      const path = resolve(__dirname, "..", "..", "uploads", `${image.path}`);
      console.log(path);
      fs.rm(path, (err) => {
        if (err) throw err;
        console.log(`Success deleted ${path}`);
      });
    });

    const advert = await advertsRepository.delete(id);
    return res.json({ message: "Deletado com sucesso!" });
  },

  async deleteAll(req: Request, res: Response) {
    const { userId } = req.params;

    const advertsRepository = getRepository(Advert);

    const advert = await advertsRepository.delete({ userId: parseInt(userId) });

    return res.json({ message: "Deletados com sucesso!" });
  },
};
