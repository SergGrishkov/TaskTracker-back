import express from "express";

import boardsControllers from "../controllers/contactsControllers.js";

import validateId from "../helpers/validateId.js";

const router = express.Router();

const jsonParser = express.json();

router.get("/", boardsControllers.getAllContacts);
router.post("/", jsonParser, boardsControllers.createContact);
router.put("/:id", validateId, jsonParser, boardsControllers.updateContact);
router.delete(
  "/:id",
  validateId,
  contactsCboardsControllersontrollers.deleteContact
);

export default router;
