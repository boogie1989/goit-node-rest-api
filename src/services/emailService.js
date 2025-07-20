// host: “smtp.ukr.net”;
// port: 465
// secure: true
// auth: { user: ваша_поштова_скринька, pass: сгенерований_вище_пароль}
import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER;
const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
};

export class EmailService {
    #transporter = nodemailer.createTransport(config);

    /** 
     * @param {string} email 
     * @returns {Promise<boolean>} 
     */
    async send(email) {
        const emailOptions = {
            from: SMTP_USER,
            to: email,
            subject: 'Nodemailer test',
            text: 'Привіт. Ми тестуємо надсилання листів!',
        };

        return (await this.#transporter.sendMail(emailOptions))
            .accepted.includes(email);
    }


    /**
     * 
     * @param {string} email 
     * @param {string} token 
     * @returns {Promise<boolean>} 
     */
    async sendVerification(email, token) {
        return await this.send(email);
    }
}