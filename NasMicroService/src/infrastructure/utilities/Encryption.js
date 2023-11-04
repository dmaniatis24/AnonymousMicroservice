"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encryption {
    constructor(saltRounds = 12) {
        this.saltRounds = saltRounds;
    }
    // Hash a plain text password
    async hashPassword(plainTextPassword) {
        try {
            const hash = await bcrypt_1.default.hash(plainTextPassword, this.saltRounds);
            return hash;
        }
        catch (error) {
            throw new Error('Password hashing failed');
        }
    }
    // Verify a password against a hashed password
    async verifyPassword(plainTextPassword, hashedPassword) {
        try {
            return await bcrypt_1.default.compare(plainTextPassword, hashedPassword);
        }
        catch (error) {
            throw new Error('Password verification failed');
        }
    }
}
exports.default = Encryption;
