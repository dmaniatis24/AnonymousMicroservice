// @ts-ignore
import { BadRequestError } from '../infrastructure/Errors'
import { getEnvVar } from '../../infrastructure/utilities/GetEnvVar'
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

const Users = (props: any) => {
    //validate(props)
    const {
        username,
        nameUser,
        surname,
        position,
        password,
        userId,
        email,
        userType,
        domain,
        isDeleted,
        deletedAt,
        updatedAt
    } = props
    return {
        username,
        nameUser,
        surname,
        position: getEnvVar('DEFAULT_USER_POSITION'),
        userId,
        password,
        email,
        userType: getEnvVar('DEFAULT_USER_TYPE'),
        domain: null,
        isDeleted: null,
        deletedAt: null,
        updatedAt: null
    }
}

export default Users
