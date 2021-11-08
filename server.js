const express = require('express');
const app = express();
app.use(express.json());

const port = 8080;
app.listen(port, () => {
    console.log(`server lytter på http://localhost:${port}`);
});

let test = 2;