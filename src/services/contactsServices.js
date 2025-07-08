import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { v4 as uuid } from 'uuid';
import { Contact } from '../db/models/contact.js';

const contactsPath = resolve('src', 'db', 'contacts.json');

/**
 * Reads the contacts from the file and returns them as an array of objects.
 * 
 * @returns {Promise<Contact[]>} Array of contact objects.
 */
export async function listContacts() {
    return Contact.findAll();
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} Contact object or null if not found.
 */
export async function getContactById(contactId) {
    return (await listContacts()).find(contact => contact.id === contactId);
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} Removed contact object or null if not found.
 */
export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const removedContact = contacts.splice(index, 1)[0];
    await writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

/**
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @returns {Promise<Contact>} New contact object.
 */
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: uuid(), name, email, phone };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}


/**
 * 
 * @param {string} contactId 
 * @param {Partial<Contact>} body 
 * @returns {Promise<Contact | null>} New contact object.
 */
export async function updateContact(contactId, body) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const contact = contacts[index];
    contact.name = body.name ?? contact.name;
    contact.email = body.email ?? contact.email;
    contact.phone = body.phone ?? contact.phone;
    await writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
}


/**
 * 
 * @param {string} contactId 
 * @returns {Promise<Contact | null>} New contact object.
 */
export async function toggleFavorite(contactId) {
    throw new Error("Not implemented");
}