"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailApp_1 = __importDefault(require("../../infrastructure/utilities/Email/EmailApp"));
class EmailsService {
    constructor({ repository }) {
        this.repository = repository;
        this.logger = repository.logger;
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }
    async sendEmailTo(payload) {
        if (payload.contactMethod) {
            const mail = new EmailApp_1.default();
            if (await mail.isValidEmail(payload.contactMethod)) {
                this.logger.debug({ msg: 'Email is Valid and will begin to Send' });
                return await mail
                    .sendEmail(payload.emailType, payload.contactMethod, payload.subject, payload.reportId)
                    .then((info) => {
                    console.log('Email sent:', info.response);
                    return { message: 'Email sent', info: info.response };
                })
                    .catch((error) => {
                    console.error('Email sending failed:', error);
                    return { error: error, message: 'Email Failes' };
                });
            }
            else {
                return { error: 'Not a valid Email address.' };
            }
        }
        else {
            return { error: 'No email Address Provided.' };
        }
    }
}
exports.default = EmailsService;
