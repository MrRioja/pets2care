import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/", upload.array("images"));

export default routes;
