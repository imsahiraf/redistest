const Redis = require('ioredis');
require('dotenv').config();

class RedisClient {
  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });
  }

  async get(key) {
    return await this.redisClient.get(key);
  }
}

module.exports = RedisClient;
