import { createApp } from "./createApp.js";

const app = await createApp();
app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});