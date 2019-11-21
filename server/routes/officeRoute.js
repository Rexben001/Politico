import express from "express";
import OfficeController from "../controllers/officeController";
import officeValidator from "../middlewares/Validators/officeValidator";
import Authentication from "../middlewares/auth";

import { getCache, setCache, clearCache } from "../middlewares/cache";

const officeRoute = express.Router();

officeRoute.post(
  "/offices",
  officeValidator,
  Authentication.verifyUser,
  OfficeController.registerOffice,
  clearCache
);
officeRoute.get(
  "/offices",
  getCache,
  Authentication.verifyUser,
  OfficeController.getAllOffices,
  setCache
);
officeRoute.get(
  "/offices/:office_id",
  getCache,
  Authentication.verifyUser,
  OfficeController.getOneOffice,
  setCache
);

export default officeRoute;
