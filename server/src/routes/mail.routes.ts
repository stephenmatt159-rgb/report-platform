import { Router } from "express";
import {
  sendContactFormMail,
  propertyRequestForm,
} from "../controller/mail.controller";

const router = Router();

router.post("/", sendContactFormMail);
router.post("/property-request", propertyRequestForm);

export default router;
