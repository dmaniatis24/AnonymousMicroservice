"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetEnvVar_1 = require("../../infrastructure/utilities/GetEnvVar");
// import Validation from '../../infrastructure/utilities/Validation'
// const validate = (users: any) => {
//     const validator = new Validation()
//     if (JSON.stringify(validator.emailValidation(users.username))) {
//         throw new BadRequestError({
//             //message: `Data should not be larger than ${DATA_FIELD_LENGTH}`
//             message: `Username must be a Valid Email.`
//         })
//     }
// }
const Users = (props) => {
    //validate(props)
    const { username, nameUser, surname, position, password, userId, email, userType, domain, isDeleted, deletedAt, updatedAt } = props;
    return {
        username,
        nameUser,
        surname,
        position: (0, GetEnvVar_1.getEnvVar)('DEFAULT_USER_POSITION'),
        userId,
        password,
        email,
        userType: (0, GetEnvVar_1.getEnvVar)('DEFAULT_USER_TYPE'),
        domain: null,
        isDeleted: null,
        deletedAt: null,
        updatedAt: null
    };
};
exports.default = Users;
