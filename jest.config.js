module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testMatch: ['**/src/**/*.test.ts'],
    setupFiles: [],
    coveragePathIgnorePatterns: ['node_modules/', 'src/lib/grpc/'],
    coverageProvider: 'v8',
    verbose: true,
};
