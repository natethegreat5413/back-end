module.exports = {
    registerValid,
    loginValid,
};

function registerValid(user) {
    return Boolean(
        user.username &&
            user.email &&
            user.password &&
            typeof user.password === 'string'
    );
}

function loginValid(user) {
    return Boolean(
        user.username && user.password && typeof user.password === 'string'
    );
}
