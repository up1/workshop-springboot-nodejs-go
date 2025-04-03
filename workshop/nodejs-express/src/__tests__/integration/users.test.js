const request = require('supertest');
const express = require('express');
// const UserService = require('../../services/userService');
const createUserRoutes = require('../../routes/userRoutes');

describe('User API Integration Tests', () => {
    let app;
    let mockUserService;

    beforeEach(() => {
        app = express();
        app.use(express.json());

        mockUserService = {
            getAllUsers: jest.fn(),
            createUser: jest.fn()
        };

        app.use('/', createUserRoutes(mockUserService));
    });

    describe('GET /users', () => {
        it('should return all users', async () => {
            const users = [
                { id: 1, name: 'Test User 1', age: 25 },
                { id: 2, name: 'Test User 2', age: 30 }
            ];
            mockUserService.getAllUsers.mockResolvedValue(users);

            const response = await request(app)
                .get('/users')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(users);
            expect(mockUserService.getAllUsers).toHaveBeenCalled();
        });

        // it('should handle errors', async () => {
        //     mockUserService.getAllUsers.mockRejectedValue(new Error('Database error'));

        //     await request(app)
        //         .get('/users')
        //         .expect('Content-Type', /json/)
        //         .expect(500)
        //         .expect({ error: 'Internal server error' });
        // });
    });

    // describe('POST /users', () => {
    //     it('should create a new user', async () => {
    //         const newUser = { name: 'New User', age: 25 };
    //         const createdUser = { id: 1, ...newUser };
    //         mockUserService.createUser.mockResolvedValue(createdUser);

    //         const response = await request(app)
    //             .post('/users')
    //             .send(newUser)
    //             .set('Content-Type', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(200);

    //         expect(response.body).toEqual(createdUser);
    //         expect(mockUserService.createUser).toHaveBeenCalledWith(newUser);
    //     });

    //     it('should validate request body', async () => {
    //         const invalidUser = { name: 'Test User' }; // missing age

    //         const response = await request(app)
    //             .post('/users')
    //             .send(invalidUser)
    //             .set('Content-Type', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(400);

    //         expect(response.body.error).toBeDefined();
    //         expect(mockUserService.createUser).not.toHaveBeenCalled();
    //     });

    //     it('should check content type', async () => {
    //         const newUser = { name: 'New User', age: 25 };

    //         await request(app)
    //             .post('/users')
    //             .send(newUser)
    //             .set('Content-Type', 'text/plain')
    //             .expect('Content-Type', /json/)
    //             .expect(400)
    //             .expect({ error: 'Invalid content type' });
    //     });
    // });
});
