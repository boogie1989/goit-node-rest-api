import { expect } from '@jest/globals';

describe('ContactsController', () => {
    function checkContactsLength(lenght = 0) {
        test(`should get all user contacts -> ${lenght}`, async () => {
            const response = await globalThis.client.get('contacts');

            const { statusCode, body } = response;
            expect(statusCode).toBe(200);
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBe(lenght);
            if (body.length > 0) {
                contactId = body[0].id;
            }
        });
    }

    checkContactsLength(0);

    test('should create a new user contact', async () => {
        const response = await globalThis.client.post('contacts').send({
            name: 'test',
            email: 'test@gmail.com',
            phone: '123123'
        });

        const { statusCode, body } = response;
        expect(statusCode).toBe(201);
        expect(body.name).toBe('test');
        expect(body.email).toBe('test@gmail.com');
        expect(body.phone).toBe('123123');
        contactId = body.id;
    });

    checkContactsLength(1);

    test('should get one user contact', async () => {
        const response = await globalThis.client.get(`contacts/${contactId}`);

        const { statusCode, body } = response;
        expect(statusCode).toBe(200);
        expect(body.name).toBe('test');
        expect(body.email).toBe('test@gmail.com');
        expect(body.phone).toBe('123123');
    });


    test('should update a user contact', async () => {
        const response = await globalThis.client.put(`contacts/${contactId}`).send({
            name: 'test2',
            email: 'test2@gmail.com',
            phone: '123123'
        });

        const { statusCode, body } = response;
        expect(statusCode).toBe(200);
        expect(body.name).toBe('test2');
        expect(body.email).toBe('test2@gmail.com');
        expect(body.phone).toBe('123123');
    });

    test('should delete a user contact', async () => {
        const response = await globalThis.client.delete(`contacts/${contactId}`);

        const { statusCode } = response;
        expect(statusCode).toBe(200);
    });

    checkContactsLength(0);
});