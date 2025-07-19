import request from 'supertest';
import { createApp } from '../../src/createApp.js';
import dotenv from 'dotenv';
import path from 'path';
import { UnauthorizedError } from '../../src/errors/httpError.js';


export class TestHelper {

    /**
     * @type {Promise<string>}
    */
    #token;

    /**
     * @type {import('supertest').SuperTest<import('supertest').Test>}
    */
    #client;
    #email = `${Date.now()}@gmail.com`;
    #password = '123123';

    async init() {
        dotenv.config({ path: path.join(process.cwd(), '.env') });
        this.#client = await createApp({ cleanDatabase: true }).then(request);

        await this.register();
        const response = await this.login();
        this.#token = response.body.token;
    }

    dispose() { }

    get currentUserEmail() { return this.#email }


    /**
     * @returns {import('supertest').Test}
     */
    register(name = 'test', email = this.#email, password = this.#password) {
        return this.post('auth/register', false).send({
            name, email, password
        });
    }

    /**
     * @returns {import('supertest').Test}
     */
    login(email = this.#email, password = this.#password) {
        return this.post('auth/login', false).send({
            email, password
        });
    }


    /**
     * @param {import('supertest').Test} test
     * @param {boolean} addToken
     * @returns {import('supertest').Test}
     */
    #setToken(test, addToken = true) {
        if (addToken) {
            if (!this.#token) {
                throw new UnauthorizedError();
            }
            test.set('Authorization', `Bearer ${this.#token}`);
        }
        return test;
    }

    #cleanUpPath(path) {
        if (path.startsWith('/api/')) {
            return path;
        }
        return `/api/${path}`;
    }

    /**
     * @param {string} path
     * @param {boolean} addToken
     * @returns {import('supertest').Test}
     */
    get(path, addToken = true) {
        return this.#setToken(
            this.#client.get(this.#cleanUpPath(path)),
            addToken,
        );
    }

    /**
     * @param {string} path
     * @param {boolean} addToken
     * @returns {import('supertest').Test}
     */
    post(path, addToken = true) {
        return this.#setToken(
            this.#client.post(this.#cleanUpPath(path)),
            addToken,
        );
    }

    /**
     * @param {string} path
     * @param {boolean} addToken
     * @returns {import('supertest').Test}
     */
    put(path, addToken = true) {
        return this.#setToken(
            this.#client.put(this.#cleanUpPath(path)),
            addToken,
        );
    }

    /**
     * @param {string} path
     * @param {boolean} addToken
     * @returns {import('supertest').Test}
     */
    patch(path, addToken = true) {
        return this.#setToken(
            this.#client.patch(this.#cleanUpPath(path)),
            addToken,
        );
    }

    /**
     * @param {string} path
     * @param {boolean} addToken
     * @returns {import('supertest').Test}
     */
    delete(path, addToken = true) {
        return this.#setToken(
            this.#client.delete(this.#cleanUpPath(path)),
            addToken,
        );
    }
}




