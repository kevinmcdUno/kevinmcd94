
const express = require('express')
const app = express()
const { json } = require("body-parser");

app.use(json());

app.post('/:id', (req, res) => {
    const { id } = req.params;
    const { goodbye } = req.query
    const { hello } = req.body;
    res.status(201).json({id, hello, goodbye });
});

app.listen(3000)