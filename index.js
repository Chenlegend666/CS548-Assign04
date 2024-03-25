const { GITHUB_ACCESS_TOKEN } = require('./setting.js');
const { getLoggerInstance } = require('./logger.js');
const logger = getLoggerInstance();

const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const setting = require('./setting.js');

const app = express();

const options = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.crt')
};

const server = https.createServer(options, app);
app.use(cors());
app.use(express.json());

app.post('/github', async (req, res) => {
    const response = await axios.get('https://api.github.com/repos/Chenlegend666/CS548-Assign04/contents/github_settings.json', {
        headers: {
            Authorization: `token ${GITHUB_ACCESS_TOKEN}`  
        },
    });
    const settingsData = Buffer.from(response.data.content, 'base64').toString('utf-8');
    const minimalResponse = extractMinimalResponse(settingsData);
    const responseData = {
        receiviedData: req.body,
        responseData: minimalResponse,
    }

    res.json(responseData);
});

function extractMinimalResponse(data) {
    let parsedData = JSON.parse(data);

    const minimalResponse = {
        mappedZipCodes: parsedData.ecomStore.mappedZipCodes,
        timezone: parsedData.timezone,
    };
    return minimalResponse;
}

server.listen(8080, () => {
    logger.info(`Server is up`)
});