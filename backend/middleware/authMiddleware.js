import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';

const protect = expressAsyncHandler( async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // token of form: Bearer actual_token, so split to get the actual_token
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Token failed so not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Token does not exist so not authorized');
    }
})

export default protect;