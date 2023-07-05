const express = require('express');
const Controller = require('./controller');
const RedisClient = require('./redis');
require('dotenv').config();

const app = express();
const port = 3000;

const controller = new Controller();
const redisClient = new RedisClient();

// Call makeApiCall function every 20 seconds (3 times per minute)
setInterval(() => controller.makeApiCall(), process.env.API_RATE_PER_SECOND);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
