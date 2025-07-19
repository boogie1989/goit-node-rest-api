export default {
    globalSetup: './test/setup.js',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
};
