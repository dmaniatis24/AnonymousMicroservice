import { body } from 'express-validator'

export const postReportValidator = () => {
      const organizationRelationTypeId = 'ORGREL'
      const organizationTypeId = 'ORGTYPE'
      const involvementId = 'INVOL'
      const reportResultsId = 'REPRESULTS'

      return [
            body('organizationRelationTypeId')
                  .optional()
                  .custom((val) => {
                        if (!val.includes(organizationRelationTypeId)) {
                              throw new Error('error validation')
                        }
                        return true
                  })
                  .withMessage({
                        message: `Organization Relation Type ID must contains [${organizationRelationTypeId}]`,
                        errorCode: 1101
                  }),
            body('organizationTypeId')
                  .optional()
                  .custom((val) => {
                        if (!val.includes(organizationTypeId)) {
                              throw new Error('error validation')
                        }
                        return true
                  })
                  .withMessage({
                        message: `Organization Relation must contains [${organizationTypeId}]`,
                        errorCode: 1101
                  }),
            body('involvementId')
                  .optional()
                  .custom((val) => {
                        if (!val.includes(involvementId)) {
                              throw new Error('error validation')
                        }
                        return true
                  })
                  .withMessage({
                        message: `Involvement ID must contains [${involvementId}]`,
                        errorCode: 1101
                  }),
            body('reportResultsId')
                  .optional()
                  .custom((val) => {
                        if (!val.includes(reportResultsId)) {
                              throw new Error('error validation')
                        }
                        return true
                  })
                  .withMessage({
                        message: `Report Results ID must contains [${reportResultsId}]`,
                        errorCode: 1101
                  })
      ]
}
