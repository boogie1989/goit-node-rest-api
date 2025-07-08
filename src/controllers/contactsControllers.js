import * as contactService from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';

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
        );
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
        res.status(200).json(
            await contactService.getContactById(req.params.id)
        );
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
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(new HttpError(400, error.message))
    }
};
