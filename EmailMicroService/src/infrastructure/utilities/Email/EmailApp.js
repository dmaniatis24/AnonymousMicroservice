"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const GetEnvVar_1 = require("../GetEnvVar");
const fs_1 = __importDefault(require("fs"));
class EmailService {
    constructor() {
        // Initialize a nodemailer transporter with your email service provider's configuration.
        this.transporter = nodemailer_1.default.createTransport({
            host: (0, GetEnvVar_1.getEnvVar)('EMAIL_HOST'),
            auth: {
                user: (0, GetEnvVar_1.getEnvVar)('EMAIL_FROM'),
                pass: (0, GetEnvVar_1.getEnvVar)('EMAIL_PASS')
            },
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false
            }
            //Enable if want to view the logs
            //logger: true,
            //debug: true
        });
    }
    async sendEmail(template, to, subject, idReplace) {
        const mailOptions = {
            from: (0, GetEnvVar_1.getEnvVar)('EMAIL_FROM'),
            to: to,
            subject: subject,
            html: await this.sendEmailTemplate(template, idReplace)
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            //console.log('Email sent:', info.response)
            return info;
        }
        catch (error) {
            console.error('Email sending failed [Class]:', error);
            throw error;
        }
    }
    async isValidEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    async sendEmailTemplate(mailTemplate, idReplace) {
        //src/infrastructure/utilities/Email/templates/reportInfo.html
        const mailTemplateFileUrl = `${process.cwd()}/src/infrastructure/utilities/Email/templates/${mailTemplate}.html`;
        var template = fs_1.default.readFileSync(mailTemplateFileUrl, 'utf-8');
        template = template.replace('#idReplace#', idReplace);
        return template;
    }
}
exports.default = EmailService;
