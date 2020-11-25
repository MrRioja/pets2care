import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import advertView from "../views/adverts_view";
import Advert from "../models/Advert";

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
    const created_at = Date.now();

    const { pet_name, age, city, species, description, user_id } = req.body;

    const advertsRepository = getRepository(Advert);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      pet_name,
      age,
      city,
      species,
      description,
      user_id,
      created_at,
      images,
    };

    const schema = Yup.object().shape({
      pet_name: Yup.string().required(),
      age: Yup.number().required(),
      city: Yup.string().required(),
      species: Yup.string().required().max(300),
      description: Yup.string().required(),
      user_id: Yup.number().required(),
      created_at: Yup.number().required(),
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
};
