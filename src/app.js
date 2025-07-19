import { createApp } from "./createApp.js";

const app = createApp();
app.listen(3002, () => {
    console.log("Server is running. Use our API on port: 3000");
});