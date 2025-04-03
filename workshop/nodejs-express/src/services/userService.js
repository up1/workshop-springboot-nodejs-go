class UserService {
    constructor(userModel, redisClient) {
        this.User = userModel;
        this.redis = redisClient;
    }

    async getAllUsers() {
        let users = await this.redis.get('user-list');
        if (!users) {
            users = await this.User.findAll();
            users = JSON.stringify(users);
            await this.redis.set('user-list', users, { EX: 10 });
        }
        return JSON.parse(users);
    }

    async createUser(userData) {
        return await this.User.create(userData);
    }
}

module.exports = UserService;
