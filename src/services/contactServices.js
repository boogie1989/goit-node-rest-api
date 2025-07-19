import { Contact } from '../db/models/contact.js';

export class ContactService {
    /**
     * Reads the contacts from the file and returns them as an array of objects.
     * 
     * @returns {Promise<Contact[]>} Array of contact objects.
     */
    listContacts(ownerId) {
        return Contact.findAll({ where: { owner: ownerId } });
    }

    /**
     * 
     * @param {string} contactId 
     * @returns {Promise<Contact | null>} Contact object or null if not found.
     */
    getContactById(ownerId, contactId) {
        return Contact.findOne({ where: { id: contactId, owner: ownerId } });
    }

    /**
     * 
     * @param {string} contactId 
     * @returns {Promise<Contact | null>} Removed contact object or null if not found.
     */
    async removeContact(ownerId, contactId) {
        const contact = await this.getContactById(ownerId, contactId);
        if (!contact) {
            return null;
        }
        await contact.destroy();
        return contact;
    }

    /**
     * 
     * @param {Partial<Contact>} body 
     * @returns {Promise<Contact>} New contact object.
     */
    async addContact(ownerId, body) {
        return await Contact.create({ ...body, owner: ownerId });
    }

    /**
     * 
     * @param {string} contactId 
     * @param {Partial<Contact>} body 
     * @returns {Promise<Contact | null>} New contact object.
     */
    async updateContact(ownerId, contactId, body) {
        await Contact.update(body, { where: { id: contactId, owner: ownerId } });
        return await this.getContactById(ownerId, contactId);
    }

    /**
     * 
     * @param {string} contactId 
     * @returns {Promise<Contact | null>} New contact object.
     */
    async toggleFavorite(ownerId, contactId) {
        const contact = await this.getContactById(ownerId, contactId);
        if (!contact) {
            return null;
        }
        await contact.update({ favorite: !contact.favorite });
        return contact;
    }

}