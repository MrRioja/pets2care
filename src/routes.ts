import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import AdvertsController from "./controllers/AdvertsController";

const routes = Router();
const upload = multer(uploadConfig);

<<<<<<< HEAD
routes.get("/adverts", AdvertsController.index);
routes.get("/adverts/:id", AdvertsController.show);
routes.put("/adverts/:id", upload.array("images"), AdvertsController.update);
routes.post("/adverts", upload.array("images"), AdvertsController.create);
routes.delete("/adverts/:id", AdvertsController.delete);
//routes.delete("/adverts/user/:id", AdvertsController.deleteAll);
=======
routes.get("/pets", AdvertsController.index);
routes.get("/pets/:id", AdvertsController.show);
routes.put("/pet/:id", AdvertsController.update);
routes.post("/pets", upload.array("images"), AdvertsController.create);
routes.delete("/pet/:id", AdvertsController.delete);
routes.delete("/pets/:userId", AdvertsController.deleteAll);
>>>>>>> 33dc680f60878828c3759b5b25dd4f4c670a3018

export default routes;
