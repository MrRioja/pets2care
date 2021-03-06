import bcrypt from "bcrypt";
import AppError from "../errors/AppError";
import { Request, Response } from "express";
import { getConnection, getCustomRepository } from "typeorm";
import { generateToken } from "../config/generateToken";
import { UsersRepository } from "../repositories/UsersRepository";
import users_view from "../views/users_view";
import User from "../models/User";
import hashPassword from "../services/hashPassword";
const crypto = require("crypto");
const mailer = require("../modules/mailer");

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

    return res.json(users_view.render(user, token, true));
  }

  async update(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const usersRepository = getCustomRepository(UsersRepository);

      const user = await usersRepository.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: new AppError("User not found").message });
      }

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ passwordResetToken: token, passwordResetExpires: now })
        .where("id = :id", { id: user.id })
        .execute();

      mailer.sendMail(
        {
          to: email,
          from: "suporte@pets2care.com",
          subject: "Reset password",
          template: "auth/forgot_password",
          context: { token },
        },
        (error: Error) => {
          if (error) {
            console.log(error);

            res
              .status(400)
              .send({ error: "Cannot send forgot password email" });
          }
          return res.send();
        }
      );
    } catch (error) {
      res.status(400).json({ error: "Erro on forgot password, try again" });
    }
  }

  async reset(req: Request, res: Response) {
    const { email, password, token } = req.body;

    try {
      const usersRepository = getCustomRepository(UsersRepository);

      const user = await usersRepository.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: new AppError("User not found").message });
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).send({ error: "Token invalid" });
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        return res
          .status(400)
          .send({ error: "Token expired, generate a new one" });
      }

      user.password = await hashPassword(password);
      await usersRepository.save(user);

      res.status(200).send({ message: "Password changed successfully" });
    } catch (error) {
      res.status(400).send({ error: "Cannot reset password, try again" });
    }
  }
}

export { AuthController };
