const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');

const app = express();
const port = 3000;

const redisClient = new Redis();
const pubSub = new Redis();

const makeApiCall = async () => {
    try {
        // Fetch the request data from Redis
        // const requestData = await redisClient.get('cricketMarketList');
        const requestData = ["1.215464882", "1.215582003"];

        // If request data exists in Redis, make the API call
        if (requestData) {
            const response = await axios.post('https://oddsserverdev8180.tiger75.com/dream/get_odds1', requestData, {
                headers: {
                    'Content-Type': 'application/json' // Set the content type to JSON
                }
            });
            const jsonData={"sd":"asa"};
            const responseData = response.data;

            // Publish the response data using pub-sub
            const jsonData = JSON.stringify(responseData);
            console.log(jsonData)
            pubSub.publish('dataChannel', jsonData);
        }
    } catch (error) {
        console.error('Failed to make API call:', error);
    }
};

// Call makeApiCall function every 20 seconds (3 times per minute)
setInterval(makeApiCall, 333);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
