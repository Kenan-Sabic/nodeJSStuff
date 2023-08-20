import jwt from 'jsonwebtoken';
import { SECRET } from '../constants.js';

const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers ['x-access-token'];

    try{
        jwt.verify(token, SECRET);
    } catch (err) {
        res.status(403).send('Login failed');
        console.log(err);
    }
}


export default authMiddleware;