const jwt = require('jsonwebtoken'); 

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET); // Verifying token with async/await
        req.user = decoded;
        next(); 
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = authMiddleware;
