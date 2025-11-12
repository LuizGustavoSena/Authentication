import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    max: 50,
    windowMs: 60 * 1000,
    message: 'You have exceeded the number of requests, wait a minute'
});