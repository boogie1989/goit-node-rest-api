import express from "express";
import {
  getAllContactsHandler,
  getOneContactHandler,
  deleteContactHandler,
  createContactHandler,
  updateContactHandler,
  toggleFavoriteHandler
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { handlerErrorCatcher } from "../helpers/handlerErrorCatcher.js";

export default express.Router()
  .get("/", authMiddleware, handlerErrorCatcher(getAllContactsHandler))
  .get("/:id", authMiddleware, handlerErrorCatcher(getOneContactHandler))
  .delete("/:id", authMiddleware, handlerErrorCatcher(deleteContactHandler))
  .post("/",
    validateBody(createContactSchema),
    authMiddleware,
    handlerErrorCatcher(createContactHandler)
  )
  .put("/:id",
    validateBody(updateContactSchema),
    authMiddleware,
    handlerErrorCatcher(updateContactHandler)
  )
  .patch("/:id/favorite", authMiddleware, handlerErrorCatcher(toggleFavoriteHandler));
