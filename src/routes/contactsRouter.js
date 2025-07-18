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
import { errorHandler } from "../helpers/errorHandler.js";


export default express.Router()
  .get("/", authMiddleware, errorHandler(getAllContactsHandler))
  .get("/:id", authMiddleware, errorHandler(getOneContactHandler))
  .delete("/:id", authMiddleware, errorHandler(deleteContactHandler))
  .post("/",
    validateBody(createContactSchema),
    authMiddleware,
    errorHandler(createContactHandler)
  )
  .put("/:id",
    validateBody(updateContactSchema),
    authMiddleware,
    errorHandler(updateContactHandler)
  )
  .patch("/:id/favorite", authMiddleware, errorHandler(toggleFavoriteHandler));
