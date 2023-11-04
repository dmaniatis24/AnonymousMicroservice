import GenerateIds from '../../infrastructure/utilities/GenerateIds'
import EmailService from '../../infrastructure/utilities/Email/EmailApp'

class EmailsService {
    private repository: any
    private logger: any

    constructor({repository}: any) {
        this.repository = repository
        this.logger = repository.logger

        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }

    async sendEmailTo(payload: string | any) {
        if (payload.contactMethod) {
            const mail = new EmailService()
            if (await mail.isValidEmail(payload.contactMethod)) {
                this.logger.debug({msg: 'Email is Valid and will begin to Send'})


                return await mail
                    .sendEmail(payload.emailType, payload.contactMethod, payload.subject, payload.reportId)
                    .then((info) => {
                        console.log('Email sent:', info.response)
                        return {message: 'Email sent', info: info.response}
                    })
                    .catch((error) => {
                        console.error('Email sending failed:', error)
                        return {error:error, message: 'Email Failes'}
                    })
            } else {
                return {error: 'Not a valid Email address.'}
            }

        } else {
            return {error: 'No email Address Provided.'}
        }
    }
}

export default EmailsService
