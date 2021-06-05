import * as Yup from "yup";
import AppError from "../errors/AppError";
import { Request, Response } from "express";
import users_view from "../views/users_view";
import { getCustomRepository, In } from "typeorm";
import hashPassword from "../services/hashPassword";
import { generateToken } from "../config/generateToken";
import { UsersRepository } from "../repositories/UsersRepository";
import { ImagesRepository } from "../repositories/ImagesRepository";
import { AdvertsRepository } from "../repositories/AdvertsRepository";
import extractIds from "../utils/extractIds";
import deleteImages, { deleteAvatar } from "../utils/deleteImages";
import { stringToBoolean } from "../utils/stringToBoolean";

class UsersController {
  async index(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return res.json(users_view.renderMany(users));
  }

  async show(req: Request, res: Response) {
    const { userId } = req.params;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOneOrFail(userId);

    return res.json(users_view.render(user));
  }

  async create(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const createdAt = Date.now();
    const {
      name,
      email,
      password,
      gender,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      birthDate,
      telephone,
      description,
      website,
    } = req.body;

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: new AppError("User already exists").message });
    }

    const isSpotlight =
      req.body.isSpotlight !== undefined && ""
        ? await stringToBoolean(req.body.isSpotlight)
        : false;

    const requestImages = req.files as Express.Multer.File[];

    const [{ path: avatar }] =
      requestImages.length > 0
        ? requestImages.map((image) => {
            return { path: image.filename };
          })
        : [{ path: undefined }];

    const data = {
      name,
      email,
      password: await hashPassword(password),
      gender,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      birthDate,
      telephone,
      description,
      website,
      isSpotlight,
      avatar,
      createdAt,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
      gender: Yup.string().required(),
      cep: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().nullable(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      birthDate: Yup.string().required(),
      telephone: Yup.string().required(),
      description: Yup.string().nullable().max(1000),
      website: Yup.string().nullable(),
      isSpotlight: Yup.boolean(),
      avatar: Yup.string().nullable(),
      createdAt: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    const token = await generateToken({ id: user.id });

    return res.status(201).json(users_view.render(user, token));
  }

  async update(req: Request, res: Response) {
    const { userId } = req.params;
    const requestImages = req.files as Express.Multer.File[];

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOneOrFail(userId);

    const oldAvatar = user.avatar;

    let avatar = user.avatar;

    if (requestImages.length > 0) {
      [{ path: avatar }] = requestImages.map((image) => {
        return { path: image.filename };
      });
    } else if (req.body.avatar === "") {
      avatar = "";
    }

    if (oldAvatar.length > 0 && oldAvatar !== avatar) {
      deleteAvatar(oldAvatar);
    }

    const isSpotlight =
      req.body.isSpotlight !== undefined && req.body.isSpotlight !== ""
        ? await stringToBoolean(req.body.isSpotlight)
        : false;

    const data = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      cep: req.body.cep,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      state: req.body.state,
      birthDate: req.body.birthDate,
      telephone: req.body.telephone,
      description: req.body.description,
      website: req.body.website,
      isSpotlight,
      avatar,
    };

    usersRepository.merge(user, data);

    const userUpdated = await usersRepository.save(user);

    return res.json(users_view.render(userUpdated));
  }

  async delete(req: Request, res: Response) {
    const { userId } = req.params;

    const usersRepository = getCustomRepository(UsersRepository);
    const advertsRepository = getCustomRepository(AdvertsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const user = await usersRepository.findOneOrFail(userId);

    const avatar = user.avatar;

    const adverts = await advertsRepository.find({
      select: ["id"],
      where: { userId: userId },
    });

    const ids = extractIds(adverts);

    const images = await imagesRepository.find({
      select: ["path"],
      where: { advert: In(ids) },
    });

    if (images.length > 0) {
      deleteImages(images);
    }

    if (ids.length > 0) {
      await advertsRepository.delete(ids);
    }

    if (avatar.length > 0) {
      deleteAvatar(avatar);
    }

    await usersRepository.delete(userId);

    return res.json({ message: "Deletado com sucesso!" });
  }
}

export { UsersController };
