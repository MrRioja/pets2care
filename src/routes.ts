import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import { AdvertsController } from "./controllers/AdvertsController";
import { UsersController } from "./controllers/UsersController";

const advertsController = new AdvertsController();
const usersController = new UsersController();

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/pets", advertsController.index);
routes.get("/pets/:id", advertsController.show);
routes.put("/pet/:id", upload.array("images"), advertsController.update);
routes.post("/pets", upload.array("images"), advertsController.create);
routes.delete("/pet/:id", advertsController.delete);
routes.delete("/pets/:userId", advertsController.deleteAll);

routes.get("/users", usersController.index);
routes.get("/user/:id", usersController.show);
routes.post("/register", usersController.create);
routes.put("/user/:id", usersController.update);
routes.delete("/user/:id", usersController.delete);

export default routes;
