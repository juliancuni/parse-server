// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri || 'postgres://admin:pgdata@localhost:5432/lb4',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/dev', // Don't forget to change to https if needed
  allowClientClassCreation: process.env.CLIENT_CLASS_CREATION || false,
  verifyUserEmails: true,
  
  emailAdapter: {
    module: 'nodemailer',
    options: {
      host: process.env.MAIL_HOST || "mail.example.com",
      port: process.env.MAIL_PORT || 587,
      secure: process.env.MAIL_SECURE || true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER || "USER",
        pass: process.env.MAIL_PASS || "PASS",
      },
    }
  },
  accountLockout: {
    // Lock the account for 5 minutes.
    duration: 5,
    // Lock an account after 3 failed log-in attempts
    threshold: 3,
    // Unlock the account after a successful password reset
    unlockOnPasswordReset: true,
  },
  // The password policy
  passwordPolicy: {
    // Enforce a password of at least 8 characters which contain at least 1 lower case, 1 upper case and 1 digit
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    // Do not allow the username as part of the password
    doNotAllowUsername: true,
    // Do not allow to re-use the last 5 passwords when setting a new password
    maxPasswordHistory: 5,
  },

  // liveQuery: {
  //   classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  // },
  javascriptKey: process.env.JS_KEY || "",
};
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /dev URL prefix
const mountPath = process.env.PARSE_MOUNT || '/dev';
if (!test) {
  const api = new ParseServer(config);
  app.use(mountPath, api);
}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('DEV-SERVER');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get('/test', function (req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

const port = process.env.PORT || 1337;
if (!test) {
  const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-development running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  // ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
