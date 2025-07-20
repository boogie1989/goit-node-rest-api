import { NotFoundError } from '../errors/httpError.js';
import { ContactService } from '../services/contactServices.js';

export class ContactController {
    /**
     * Handles all the controllers for contacts.
     * @type {ContactService}
     */
    #contactService;

    /**
     * 
     * @param {ContactService} contactService 
     */
    constructor(contactService) {
        this.#contactService = contactService;
    }

    /**
     * @type {RequestHandler}
     */
    getAll = async (req, res) => {
        res.status(200).json(
            await this.#contactService.listContacts(req.user.id)
        )
    }

    /**
     * @type {RequestHandler}
     */
    getOne = async (req, res) => {
        const contact = await this.#contactService.getContactById(req.user.id, req.params.id);
        if (!contact) {
            throw new NotFoundError();
        }
        res.status(200).json(contact);
    }

    /**
     * @type {RequestHandler}
     */
    create = async (req, res) => {
        res.status(201).json(
            await this.#contactService.addContact(req.user.id, req.body)
        );
    }

    /**
     * @type {RequestHandler}
     */
    update = async (req, res) => {
        const updatedContact = await this.#contactService.updateContact(req.user.id, req.params.id, req.body);
        if (!updatedContact) {
            throw new NotFoundError();
        }
        res.status(200).json(updatedContact);
    }

    /**
     * @type {RequestHandler}
     */
    delete = async (req, res) => {
        const removedContact = await this.#contactService.removeContact(req.user.id, req.params.id);
        if (!removedContact) {
            throw new NotFoundError();
        }
        res.status(200).json(removedContact);
    }

    /**
     * @type {RequestHandler}
     */
    toggleFavorite = async (req, res) => {
        const updatedContact = await this.#contactService.toggleFavorite(req.user.id, req.params.id);
        if (!updatedContact) {
            throw new NotFoundError();
        }

        res.status(200).json(updatedContact);
    }
}

