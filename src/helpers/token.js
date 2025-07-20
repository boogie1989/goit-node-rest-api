import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const secret = process.env.JWT_SECRET;

export async function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, (err, token) => err ? reject(err) : resolve(token));
    });
}

export async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => err ? reject(err) : resolve(decoded));
    });
}


export async function createVerificationToken() {
    return uuidv4();
}
