"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validation {
    async emailValidation(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
}
exports.default = Validation;
