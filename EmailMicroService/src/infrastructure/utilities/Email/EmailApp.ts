import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { getEnvVar } from '../GetEnvVar'
import fs from 'fs'

class EmailService {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        // Initialize a nodemailer transporter with your email service provider's configuration.
        this.transporter = nodemailer.createTransport({
            host: <string>getEnvVar('EMAIL_HOST'), // e.g., 'Gmail', 'Yahoo', 'Outlook', etc.
            auth: {
                user: getEnvVar('EMAIL_FROM'),
                pass: getEnvVar('EMAIL_PASS')
            },
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false
            }
            //Enable if want to view the logs
            //logger: true,
            //debug: true
        })
    }

    async sendEmail(template: string, to: string, subject: string, idReplace: string) {
        const mailOptions = {
            from: getEnvVar('EMAIL_FROM'),
            to: to,
            subject: subject,
            html: await this.sendEmailTemplate(template, idReplace)
        }

        try {
            const info = await this.transporter.sendMail(mailOptions)
            //console.log('Email sent:', info.response)
            return info
        } catch (error) {
            console.error('Email sending failed [Class]:', error)
            throw error
        }
    }

    async isValidEmail(email: string) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return emailRegex.test(email)
    }

    async sendEmailTemplate(mailTemplate: string, idReplace: string): Promise<any> {
        //src/infrastructure/utilities/Email/templates/reportInfo.html
        const mailTemplateFileUrl = `${process.cwd()}/src/infrastructure/utilities/Email/templates/${mailTemplate}.html`
        var template = fs.readFileSync(mailTemplateFileUrl, 'utf-8')

        template = template.replace('#idReplace#', idReplace)

        return template
    }
}

export default EmailService
