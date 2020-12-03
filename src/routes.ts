import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import AdvertsController from "./controllers/AdvertsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/pets", AdvertsController.index);
routes.get("/pets/:id", AdvertsController.show);
routes.put("/pet/:id", AdvertsController.update);
routes.post("/pets", upload.array("images"), AdvertsController.create);
routes.delete("/pet/:id", AdvertsController.delete);
routes.delete("/pets/:userId", AdvertsController.deleteAll);

export default routes;
