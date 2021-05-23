import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import { AdvertsController } from "./controllers/AdvertsController";
import { UsersController } from "./controllers/UsersController";
import { AuthController } from "./controllers/AuthController";

const advertsController = new AdvertsController();
const usersController = new UsersController();
const authController = new AuthController();

const authMiddleware = require("./middlewares/auth");

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/pets", authMiddleware, advertsController.index);
routes.get("/pets/user/:id", authMiddleware, advertsController.indexByUser);
routes.get("/pets/:id", authMiddleware, advertsController.show);
routes.put(
  "/pet/:id",
  authMiddleware,
  upload.array("images"),
  advertsController.update
);
routes.post(
  "/pets",
  authMiddleware,
  upload.array("images"),
  advertsController.create
);
routes.delete("/pet/:id", authMiddleware, advertsController.delete);
routes.delete("/pets/:userId", authMiddleware, advertsController.deleteAll);

routes.get("/users", authMiddleware, usersController.index);
routes.get("/user/:id", authMiddleware, usersController.show);
routes.put("/user/:id", authMiddleware, usersController.update);
routes.delete("/user/:id", authMiddleware, usersController.delete);

routes.post("/register", upload.array("avatar"), usersController.create);
routes.post("/authenticate", authController.create);

export default routes;
