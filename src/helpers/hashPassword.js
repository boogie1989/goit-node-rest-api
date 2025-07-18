import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        hash(password, 10, (err, hash) => err ? reject(err) : resolve(hash));
    });
};

export async function comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
        compare(password, hash, (err, result) => err ? reject(err) : resolve(result));
    });
};