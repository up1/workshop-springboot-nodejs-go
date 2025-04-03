const express = require('express');
require('dotenv').config();

const { initializeDatabase, initializeRedis } = require('./config/database');
const defineUser = require('./models/user');
const UserService = require('./services/userService');
const createUserRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = initializeDatabase();
const redisClient = initializeRedis();
const User = defineUser(sequelize);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await redisClient.connect();
        
        const userService = new UserService(User, redisClient);
        app.use('/', createUserRoutes(userService));
        
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();