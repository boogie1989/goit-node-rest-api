import * as contactService from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';

const NOT_FOUND_JSON = { message: "Not found" };

/**
 * @typedef {(
*   req: import('express').Request,
*   res: import('express').Response,
*   next: import('express').NextFunction
* ) => any} RequestHandler
*/


/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const getAllContacts = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactService.listContacts()
        )
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const getOneContact = async (req, res, next) => {
    try {
        const contact = await contactService.getContactById(req.params.id);
        if (!contact) {
            return res.status(404).json(NOT_FOUND_JSON);
        }
        res.status(200).json(contact);
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const deleteContact = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactService.removeContact(req.params.id)
        );
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const createContact = async (req, res, next) => {
    try {

        res.status(201).json(
            await contactService.addContact(req.body)
        );
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};

/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const updateContact = async (req, res, next) => {
    try {
        const updatedContact = await contactService.updateContact(req.params.id, req.body);
        if (!updatedContact) {
            return res.status(404).json(NOT_FOUND_JSON);
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};



/**
 * Handles all the controllers for contacts.
 * @type {RequestHandler}
 */
export const toggleFavorite = async (req, res, next) => {
    try {
        const updatedContact = await contactService.toggleFavorite(req.params.id);
        if (!updatedContact) {
            return res.status(404).json(NOT_FOUND_JSON);
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(new HttpError(400, error.message))
    }
}