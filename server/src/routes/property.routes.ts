import { Router } from "express";
import {
  getAllProperties,
  getProperty,
} from "../controller/property.controller";

const router = Router();

router.get("/", getAllProperties);
router.get("/:id", getProperty);

export default router;
