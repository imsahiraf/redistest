const axios = require('axios');
const Redis = require('ioredis');
require('dotenv').config();

class Controller {
  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });
    this.pubSub = new Redis ({
      host: process.env.PUBSUB_HOST,
      port: process.env.PUBSUB_PORT
    });
    this.apiUrl = process.env.API_URL;
  }

  async makeApiCall() {
    try {
      // Fetch the request data from Redis
    //   const requestData = await redisClient.get('cricketMarketList');
      const requestData = ["1.215464882", "1.215582003"];

      // If request data exists in Redis, make the API call
      if (requestData) {
        const response = await axios.post(this.apiUrl, requestData, {
          headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
          }
        });
        const responseData = response.data;

        // Publish the response data using pub-sub
        const jsonData = JSON.stringify(responseData);
        // console.log(jsonData);
        console.log(JSON.stringify(jsonData, undefined, 4));
        this.pubSub.publish('dataChannel', jsonData);
      }
    } catch (error) {
      console.error('Failed to make API call:', error);
    }
  }
}

module.exports = Controller;
