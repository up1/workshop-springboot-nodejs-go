const UserService = require('../userService');

describe('UserService', () => {
    let mockUserModel;
    let mockRedisClient;
    let userService;

    beforeEach(() => {
        mockUserModel = {
            findAll: jest.fn(),
            create: jest.fn()
        };
        mockRedisClient = {
            get: jest.fn(),
            set: jest.fn()
        };
        userService = new UserService(mockUserModel, mockRedisClient);
    });

    describe('getAllUsers', () => {
        it('should return cached users if available', async () => {
            const cachedUsers = [{ id: 1, name: 'Test User', age: 25 }];
            mockRedisClient.get.mockResolvedValue(JSON.stringify(cachedUsers));

            const result = await userService.getAllUsers();
            
            expect(result).toEqual(cachedUsers);
            expect(mockRedisClient.get).toHaveBeenCalledWith('user-list');
            expect(mockUserModel.findAll).not.toHaveBeenCalled();
        });

        it('should fetch users from database if not cached', async () => {
            const dbUsers = [{ id: 1, name: 'Test User', age: 25 }];
            mockRedisClient.get.mockResolvedValue(null);
            mockUserModel.findAll.mockResolvedValue(dbUsers);

            const result = await userService.getAllUsers();
            
            expect(result).toEqual(dbUsers);
            expect(mockRedisClient.get).toHaveBeenCalledWith('user-list');
            expect(mockUserModel.findAll).toHaveBeenCalled();
            expect(mockRedisClient.set).toHaveBeenCalled();
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = { name: 'New User', age: 30 };
            const createdUser = { id: 1, ...userData };
            mockUserModel.create.mockResolvedValue(createdUser);

            const result = await userService.createUser(userData);
            
            expect(result).toEqual(createdUser);
            expect(mockUserModel.create).toHaveBeenCalledWith(userData);
        });
    });
});
