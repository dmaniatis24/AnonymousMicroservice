import { body } from 'express-validator'
import { getEnvVar } from '../../utilities/GetEnvVar'

export const postUserValidator = () => {
      const usernameLength = 5
      const nameLength = 3

      return [
            body('username')
                  .isLength({ min: usernameLength })
                  .withMessage({
                        message: `Username should not be less than ${usernameLength} characters`,
                        errorCode: 1001
                  }),
            body('nameUser')
                  .optional()
                  .isLength({ min: nameLength })
                  .withMessage({ message: `Name should not be less than ${nameLength} characters`, errorCode: 1002 }),
            body('surname')
                  .optional()
                  .isLength({ min: nameLength })
                  .withMessage(`Lastname should not be less than ${nameLength} characters`),
            body('email').isEmail().withMessage({ message: `Must be a Valid Email`, errorCode: 1003 })
      ]
}

export const patchUserValidator = () => {
      const usernameLength = 5
      const nameLength = 3
      const userTypeVal = [1, 2, 3]

      return [
            body('username')
                  .isLength({ min: usernameLength })
                  .withMessage({
                        message: `Username should not be less than ${usernameLength} characters`,
                        errorCode: 1001
                  }),
            body('nameUser')
                  .optional()
                  .isLength({ min: nameLength })
                  .withMessage({ message: `Name should not be less than ${nameLength} characters`, errorCode: 1002 }),
            body('surname')
                  .optional()
                  .isLength({ min: nameLength })
                  .withMessage(`Lastname should not be less than ${nameLength} characters`),
            body('email').isEmail().withMessage({ message: `Must be a Valid Email`, errorCode: 1003 }),
            body('position')
                  .optional()
                  .custom((val) => {
                        if (!val.includes(getEnvVar('POSITIONID'))) {
                              throw new Error('Position must contains [POS]')
                        }
                        return true
                  })
                  .withMessage({ message: `Position must contains [POS]`, errorCode: 1004 }),
            body('userType')
                  .optional()
                  .custom((val) => {
                        if (!userTypeVal.includes(val)) {
                              throw new Error(`User Type must be ${userTypeVal}`)
                        }
                        return true
                  })
                  .withMessage({ message: `User Type must be ${userTypeVal} [Number]`, errorCode: 1005 })
      ]
}
