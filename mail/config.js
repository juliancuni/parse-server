const path = require("path");

const mailAdapterConfig = {
    module: 'parse-smtp-template',
    options: {
        host: process.env.MAIL_HOST || "smtp.mail.com",
        port: process.env.MAIL_PORT || 587,
        user: process.env.MAIL_USER || "name@domain.com",
        password: process.env.MAIL_PASS || "SecurePassword",
        fromAddress: process.env.MAIL_FROM_ADDRESS || 'app@domain.com'
    }
}

module.exports = mailAdapterConfig;