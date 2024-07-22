const express = require("express");
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const {ruleRouter} = require('./routers/ruleRouter');
server.get('/favicon.ico', (req, res) => res.status(204).end());

server.use(express.urlencoded({extended: true}));  // hundel post reqs with body
server.use(bodyParser.json());
server.use(cors());


server.use('/api-rule', ruleRouter);

server.use((req, res) => {
    res.status(400).send('Something is broken!');
});
server.listen(port, () => console.log(`listening on port ${port}`));