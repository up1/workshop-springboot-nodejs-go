module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js'],
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/__tests__/**',
        '!src/index.js'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
