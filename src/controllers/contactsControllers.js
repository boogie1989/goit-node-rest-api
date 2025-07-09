import * as contactService from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';


const NOT_FOUND_JSON = { message: "Not found" };

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const getAllContactsHandler = async (req, res) => {
    res.status(200).json(
        await contactService.listContacts(req.user.id)
    )
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const getOneContactHandler = async (req, res) => {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
        return res.status(404).json(NOT_FOUND_JSON);
    }
    res.status(200).json(contact);
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const deleteContactHandler = async (req, res) => {
    const removedContact = await contactService.removeContact(req.params.id);
    if (!removedContact) {
        return res.status(404).json(NOT_FOUND_JSON);
    }
    res.status(200).json(removedContact);
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const createContactHandler = async (req, res) => {
    res.status(201).json(
        await contactService.addContact(req.user.id, req.body)
    );
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const updateContactHandler = async (req, res) => {
    const updatedContact = await contactService.updateContact(req.params.id, req.body);
    if (!updatedContact) {
        return res.status(404).json(NOT_FOUND_JSON);
    }
    res.status(200).json(updatedContact);
};



/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const toggleFavoriteHandler = async (req, res, next) => {
    const updatedContact = await contactService.toggleFavorite(req.params.id);
    if (!updatedContact) {
        return res.status(404).json(NOT_FOUND_JSON);
    }

    res.status(200).json(updatedContact);
}