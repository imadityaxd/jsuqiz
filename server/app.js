import express from "express"; //importing express

const app = express(); //getting the returned value by calling express

app.use(express.json());

export { app }; //exporting app so that we can import app in server.js
