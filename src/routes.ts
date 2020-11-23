import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import AdvertsController from "./controllers/AdvertsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/adverts", AdvertsController.index);
routes.get("/adverts/:id", AdvertsController.show);
routes.post("/adverts", upload.array("images"), AdvertsController.create);

export default routes;
