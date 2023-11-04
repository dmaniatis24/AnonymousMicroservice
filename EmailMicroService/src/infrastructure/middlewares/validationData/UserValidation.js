"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserValidator = exports.postUserValidator = void 0;
const express_validator_1 = require("express-validator");
const GetEnvVar_1 = require("../../utilities/GetEnvVar");
const postUserValidator = () => {
    const usernameLength = 5;
    const nameLength = 3;
    return [
        (0, express_validator_1.body)('username')
            .isLength({ min: usernameLength })
            .withMessage({
            message: `Username should not be less than ${usernameLength} characters`,
            errorCode: 1001
        }),
        (0, express_validator_1.body)('nameUser')
            .optional()
            .isLength({ min: nameLength })
            .withMessage({ message: `Name should not be less than ${nameLength} characters`, errorCode: 1002 }),
        (0, express_validator_1.body)('surname')
            .optional()
            .isLength({ min: nameLength })
            .withMessage(`Lastname should not be less than ${nameLength} characters`),
        (0, express_validator_1.body)('email').isEmail().withMessage({ message: `Must be a Valid Email`, errorCode: 1003 })
    ];
};
exports.postUserValidator = postUserValidator;
const patchUserValidator = () => {
    const usernameLength = 5;
    const nameLength = 3;
    const userTypeVal = [1, 2, 3];
    return [
        (0, express_validator_1.body)('username')
            .isLength({ min: usernameLength })
            .withMessage({
            message: `Username should not be less than ${usernameLength} characters`,
            errorCode: 1001
        }),
        (0, express_validator_1.body)('nameUser')
            .optional()
            .isLength({ min: nameLength })
            .withMessage({ message: `Name should not be less than ${nameLength} characters`, errorCode: 1002 }),
        (0, express_validator_1.body)('surname')
            .optional()
            .isLength({ min: nameLength })
            .withMessage(`Lastname should not be less than ${nameLength} characters`),
        (0, express_validator_1.body)('email').isEmail().withMessage({ message: `Must be a Valid Email`, errorCode: 1003 }),
        (0, express_validator_1.body)('position')
            .optional()
            .custom((val) => {
            if (!val.includes((0, GetEnvVar_1.getEnvVar)('POSITIONID'))) {
                throw new Error('Position must contains [POS]');
            }
            return true;
        })
            .withMessage({ message: `Position must contains [POS]`, errorCode: 1004 }),
        (0, express_validator_1.body)('userType')
            .optional()
            .custom((val) => {
            if (!userTypeVal.includes(val)) {
                throw new Error(`User Type must be ${userTypeVal}`);
            }
            return true;
        })
            .withMessage({ message: `User Type must be ${userTypeVal} [Number]`, errorCode: 1005 })
    ];
};
exports.patchUserValidator = patchUserValidator;
