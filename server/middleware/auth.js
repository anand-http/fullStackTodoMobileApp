import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const isAuthenticated = async (req, res, next) => {
    try {
        const {authToken}= req.cookies;

        if (!authToken) {
            return res.status(401).json({
                message: "Login first"
            })
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        next();

    } catch (error) {
        console.log("isAuthenticated error", error);
        res.status(500).json({
            message: "Internal server error", error
        })

    }
}

export default isAuthenticated;