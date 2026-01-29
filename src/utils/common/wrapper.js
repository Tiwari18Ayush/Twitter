// src/utils/common/async-handler.js

module.exports = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // Now next is defined and will send the error to your Global Error Handler
            next(error);
        }
    };
};