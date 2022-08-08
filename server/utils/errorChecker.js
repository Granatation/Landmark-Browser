const errorChecker = (error) => {
    if (error?.message) {
        throw error;
    }
}

module.exports = errorChecker;