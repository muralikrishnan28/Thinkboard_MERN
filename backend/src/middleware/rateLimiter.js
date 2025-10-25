import ratelimit from "../config/upstosh.js";

const rateLimiter = async (req, res, next) => {
    try {
        const identifier = req.ip;
        const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
        if(!success) {
            return res.status(429).json({
                message: "Too many requests!, please try again later.",
                limit,
                remaining,
                reset
            });
        }
        next();
    } catch (error) {
        console.error(`RateLimit Error: ${error}`);
        next();
    }
};

export default rateLimiter;
