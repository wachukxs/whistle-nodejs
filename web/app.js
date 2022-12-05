const express = require('express');
const app = express();
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');

// set morgan to log info about our requests for development use.
const morganFormat = ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - response-time :response-time ms'
app.use(morgan(morganFormat))

app.use(helmet());
// use cors
app.use(cors())


const routes = require('../cntrl/story')

app.use('/api/v1.0', [routes])

app.use(function (req, res) {
    // check the url they navigated to that got them lost, and try to offer suggestions in the front end that'll match why they got lost... maybe they missed a letter in their statecode url
    res.status(404).send({ message: 'hey, that url does not exist' })
});

module.exports = app;