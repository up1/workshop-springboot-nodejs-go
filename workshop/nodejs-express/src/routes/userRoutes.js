const express = require('express');
const Joi = require('joi');

const router = express.Router();

const createUserRoutes = (userService) => {
    router.get('/users', async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.send(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post('/users', async (req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            age: Joi.number().integer().min(0).required()
        });

        if (!req.is('application/json')) {
            return res.status(400).json({ error: 'Invalid content type' });
        }

        const { error, value: newUser } = schema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const savedUser = await userService.createUser(newUser);
            res.send(savedUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
};

module.exports = createUserRoutes;
