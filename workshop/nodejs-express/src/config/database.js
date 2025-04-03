const { Sequelize } = require('sequelize');
const redis = require('redis');

const initializeDatabase = () => {
    const postgresHost = process.env.POSTGRES_HOST;
    const postgresPort = process.env.POSTGRES_PORT;
    const postgresPassword = process.env.POSTGRES_PASSWORD;
    const postgresUsername = process.env.POSTGRES_USERNAME;
    const postgresDatabaseName = process.env.POSTGRES_DATABASE_NAME;

    return new Sequelize(`postgres://${postgresUsername}:${postgresPassword}@${postgresHost}:${postgresPort}/${postgresDatabaseName}`);
};

const initializeRedis = () => {
    const redisHost = process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;
    
    return redis.createClient({ url: `redis://${redisHost}:${redisPort}` });
};

module.exports = { initializeDatabase, initializeRedis };
