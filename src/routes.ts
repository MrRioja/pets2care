import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import { AdvertsController } from "./controllers/AdvertsController";

const advertsController = new AdvertsController();

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/pets", advertsController.index);
routes.get("/pets/:id", advertsController.show);
routes.patch("/pet/:id", advertsController.update);
routes.post("/pets", upload.array("images"), advertsController.create);
routes.delete("/pet/:id", advertsController.delete);
routes.delete("/pets/:userId", advertsController.deleteAll);

export default routes;
