import bcrypt from "bcrypt";
import AppError from "../errors/AppError";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { generateToken } from "../config/generateToken";
import { UsersRepository } from "../repositories/UsersRepository";
import users_view from "../views/users_view";

class AuthController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: new AppError("User not found").message });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: new AppError("Invalid password").message });
    }

    const token = await generateToken({ id: user.id });

    return res.json(users_view.render(user, token));
  }
}

export { AuthController };
