import { TestHelper } from "./helpers/testHelper";

/** @type {TestHelper} */
globalThis.client;

export default async function () {
    globalThis.client = new TestHelper();
    await global.client.init();
}