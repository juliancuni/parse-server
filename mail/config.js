const path = require("path");

const mailAdapterConfig = {
    module: 'parse-smtp-template',
    options: {
        port: 587,
        host: "smtp.mail.com",
        user: "name@domain.com",
        password: "SecurePassword",
        fromAddress: 'app@domain.com'
    }
}

module.exports = mailAdapterConfig;