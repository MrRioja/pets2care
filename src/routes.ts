import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import { AdvertsController } from "./controllers/AdvertsController";
import { UsersController } from "./controllers/UsersController";
import { AuthController } from "./controllers/AuthController";
import { SpotlightsController } from "./controllers/SpotlightsController";

const advertsController = new AdvertsController();
const usersController = new UsersController();
const authController = new AuthController();
const spotlightsController = new SpotlightsController();

const authMiddleware = require("./middlewares/auth");

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/pets", authMiddleware, advertsController.index);
routes.get("/pets/user/", authMiddleware, advertsController.indexByUser);
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
routes.delete("/pets/", authMiddleware, advertsController.deleteAll);

routes.post("/register", upload.array("avatar"), usersController.create);
routes.get("/users", authMiddleware, usersController.index);
routes.get("/user", authMiddleware, usersController.show);
routes.put(
  "/user",
  authMiddleware,
  upload.array("avatar"),
  usersController.update
);
routes.delete("/user/", authMiddleware, usersController.delete);

routes.get("/spotlights/users", authMiddleware, spotlightsController.getUsers);
routes.get(
  "/spotlights/adverts",
  authMiddleware,
  spotlightsController.getAdverts
);

routes.post("/authenticate", authController.create);
routes.post("/forgot_password", authController.update);
routes.post("/reset_password", authController.reset);

export default routes;
