import * as Yup from "yup";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../errors/AppError";
import users_view from "../views/users_view";

class UsersController {
  async index(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return res.json(users_view.renderMany(users));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const usersRepository = getCustomRepository(UsersRepository);

    const advert = await usersRepository.findOneOrFail(id);

    return res.json(users_view.render(advert));
  }

  async create(req: Request, res: Response) {
    const createdAt = Date.now();
    const { name, email, password, gender, address, birthDate, telephone } =
      req.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const data = {
      name,
      email,
      password,
      gender,
      address,
      birthDate,
      telephone,
      createdAt,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
      gender: Yup.string().required(),
      address: Yup.string().required(),
      birthDate: Yup.string()
        .required()
        .matches(/\d{4}-\d{2}-\d{2}/gm),
      telephone: Yup.string().required(),
      createdAt: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOneOrFail(id);

    usersRepository.merge(user, req.body);

    const userUpdated = await usersRepository.save(user);

    return res.json(userUpdated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const usersRepository = getCustomRepository(UsersRepository);

    await usersRepository.delete(id);

    return res.json({ message: "Deletado com sucesso!" });
  }
}

export { UsersController };
