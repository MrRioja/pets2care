import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import AdvertsController from "./controllers/AdvertsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/adverts", AdvertsController.index);
routes.get("/adverts/:id", AdvertsController.show);
routes.put("/adverts/:id", AdvertsController.update);
routes.post("/adverts", upload.array("images"), AdvertsController.create);
routes.delete("/adverts/:id", AdvertsController.delete);
routes.delete("/adverts/:userId", AdvertsController.deleteAll);

export default routes;
