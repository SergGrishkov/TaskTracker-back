import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import validateId from "../helpers/validateId.js";

const router = express.Router();

const jsonParser = express.json();

router.get("/", contactsControllers.getAllContacts);
router.get("/:id", validateId, contactsControllers.getOneContact);
router.post("/", jsonParser, contactsControllers.createContact);
router.put("/:id", validateId, jsonParser, contactsControllers.updateContact);
router.delete("/:id", validateId, contactsControllers.deleteContact);
// router.patch(
//   "/:id/favorite",
//   validateId,
//   contactsControllers.updateStatusContact
// );

export default router;
