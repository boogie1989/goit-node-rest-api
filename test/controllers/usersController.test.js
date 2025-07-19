import path from 'path';


describe('UserController', () => {
    const userName = 'test';
    const email = 'test2@gmail.com';
    const password = '123123';

    test('should register a new user', async () => {
        const response = await globalThis.client.register(userName, email, password);

        const { statusCode, body } = response;
        expect(statusCode).toBe(201);
        expect(body.user?.email).toBe(email);
        expect(body.user?.subscription).toBe('starter');
        expect(body.user).toHaveProperty('avatarURL');
    });

    test('should send error on email duplication', async () => {
        const response = await globalThis.client.register(userName, email, password);

        const { statusCode, body } = response;
        expect(statusCode).toBe(409);
        expect(body).toHaveProperty('message');
    });

    test('should login user', async () => {
        const response = await globalThis.client.login(email, password);
        const { statusCode, body } = response;

        expect(statusCode).toBe(200);
        expect(body.user?.email).toBe(email);
        expect(body.user?.subscription).toBe('starter');
        expect(body.user).toHaveProperty('avatarURL');
    });


    test('should get current user', async () => {
        const response = await globalThis.client.get('auth/current');

        const { statusCode, body } = response;
        expect(statusCode).toBe(200);
        expect(body.user?.email).toBe(globalThis.client.currentUserEmail);
        expect(body.user?.subscription).toBe('starter');
        expect(body.user).toHaveProperty('avatarURL');
    });

    test('should update avatar', async () => {
        const fileName = 'avatar.jpg';
        const filePath = path.join(process.cwd(), 'test', 'helpers', 'images', fileName);
        const response = await globalThis.client.patch('auth/avatars')
            .attach('avatar', filePath)

        const { statusCode, body } = response;
        expect(statusCode).toBe(200);
        expect(body.avatarURL).toBe(fileName);
    });
});