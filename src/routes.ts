import multer from "multer";
import { Router } from "express";
import uploadConfig from "./config/upload";

import { AdvertsController } from "./controllers/AdvertsController";
import { UsersController } from "./controllers/UsersController";
import { AuthController } from "./controllers/AuthController";
import { SpotlightsController } from "./controllers/SpotlightsController";
import { HighlightsController } from "./controllers/HighlightsController";
import { FavoritesController } from "./controllers/FavoritesController";
import { DonationsController } from "./controllers/DonationsController";

const advertsController = new AdvertsController();
const usersController = new UsersController();
const authController = new AuthController();
const spotlightsController = new SpotlightsController();
const highlightsController = new HighlightsController();
const favoritesController = new FavoritesController();
const donationsController = new DonationsController();

const authMiddleware = require("./middlewares/auth");

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/pets", authMiddleware, advertsController.index);
routes.get("/pets/user", authMiddleware, advertsController.indexByUserLogged);
routes.get("/pets/user/:id", authMiddleware, advertsController.indexByUser);
routes.get("/pet/:id", authMiddleware, advertsController.show);
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
routes.delete("/pets", authMiddleware, advertsController.deleteAll);

routes.post("/register", upload.array("avatar"), usersController.create);
routes.get("/users", authMiddleware, usersController.index);
routes.get("/user", authMiddleware, usersController.showUserLogged);
routes.get("/user/:id", authMiddleware, usersController.showUser);
routes.put(
  "/user",
  authMiddleware,
  upload.array("avatar"),
  usersController.update
);
routes.delete("/user", authMiddleware, usersController.delete);

routes.get("/spotlights/users", authMiddleware, spotlightsController.getUsers);
routes.get(
  "/spotlights/adverts",
  authMiddleware,
  spotlightsController.getAdverts
);

routes.get("/highlights", highlightsController.index);
routes.get("/highlight/:id", highlightsController.show);
routes.post("/highlights", upload.array("image"), highlightsController.create);
routes.put(
  "/highlight/:id",
  upload.array("image"),
  highlightsController.update
);
routes.delete("/highlight/:id", highlightsController.delete);

routes.post("/favorite/:id", authMiddleware, favoritesController.create);
routes.delete("/favorite/:id", authMiddleware, favoritesController.delete);
routes.get("/favorites", authMiddleware, favoritesController.index);

routes.post("/donation/:id", authMiddleware, donationsController.create);
routes.post("/donations", authMiddleware, donationsController.index);
routes.post("/donation/accept/:id", authMiddleware, donationsController.accept);

routes.post("/authenticate", authController.create);
routes.post("/forgot_password", authController.update);
routes.post("/reset_password", authController.reset);

export default routes;
