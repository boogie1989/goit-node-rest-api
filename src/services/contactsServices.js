import { Contact } from '../db/models/contact.js';


/**
 * Reads the contacts from the file and returns them as an array of objects.
 * 
 * @returns {Promise<Contact[]>} Array of contact objects.
 */
export async function listContacts(ownerId) {
    return Contact.findAll({ where: { owner: ownerId } });
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} Contact object or null if not found.
 */
export async function getContactById(ownerId, contactId) {
    return Contact.findOne({ where: { id: contactId, owner: ownerId } });
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} Removed contact object or null if not found.
 */
export async function removeContact(ownerId, contactId) {
    const contact = await getContactById(ownerId, contactId);
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
export async function addContact(ownerId, body) {
    return await Contact.create({ ...body, owner: ownerId });
}


/**
 * 
 * @param {string} contactId 
 * @param {Partial<Contact>} body 
 * @returns {Promise<Contact | null>} New contact object.
 */
export async function updateContact(ownerId, contactId, body) {
    await Contact.update(body, { where: { id: contactId, owner: ownerId } });
    return await getContactById(ownerId, contactId);
}


/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} New contact object.
 */
export async function toggleFavorite(ownerId, contactId) {
    const contact = await getContactById(ownerId, contactId);
    if (!contact) {
        return null;
    }
    await contact.update({ favorite: !contact.favorite });
    return contact;
}