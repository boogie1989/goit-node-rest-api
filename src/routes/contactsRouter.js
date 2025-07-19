import express from "express";
import { ContactController } from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { errorHandler } from "../helpers/errorHandler.js";
import { ContactService } from "../services/contactServices.js";

const contactsController = new ContactController(
  new ContactService()
);

export default express.Router()
  .get("/", authMiddleware, errorHandler(contactsController.getAll))
  .get("/:id", authMiddleware, errorHandler(contactsController.getOne))
  .delete("/:id", authMiddleware, errorHandler(contactsController.delete))
  .post("/",
    validateBody(createContactSchema),
    authMiddleware,
    errorHandler(contactsController.create)
  )
  .put("/:id",
    validateBody(updateContactSchema),
    authMiddleware,
    errorHandler(contactsController.update)
  )
  .patch("/:id/favorite", authMiddleware, errorHandler(contactsController.toggleFavorite));
