import { createApp } from "./createApp.js";

const app = await createApp({ cleanDatabase: true });
app.listen(3003, () => {
    console.log("Server is running. Use our API on port: 3000");
});