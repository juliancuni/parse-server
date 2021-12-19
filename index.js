const mailAdapterConfig = require('./mail/config.js');
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
  appName: process.env.APP_NAME || "MSA",
  masterKey: process.env.MASTER_KEY || 'masterKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  publicServerURL: process.env.PUBLIC_SERVER_URL || "",
  allowClientClassCreation: process.env.CLIENT_CLASS_CREATION || false,
  verifyUserEmails: process.env.VERIFY_USERS_EMAILS || true,

  emailAdapter: mailAdapterConfig,
  accountLockout: {
    duration: 3,
    threshold: 5,
    unlockOnPasswordReset: true,
  },
  passwordPolicy: {
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    doNotAllowUsername: true,
    maxPasswordHistory: 5,
  },
  // liveQuery: {
  //   classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  // },
  clientKey: process.env.CLIENT_KEY || "",
  dotNetKey: process.env.DOTNET_KEY || "",
  restAPIKey: process.env.RESTAPI_KEY || "",
  javascriptKey: process.env.JS_KEY || "",
};

const app = express();
app.use('/public', express.static(path.join(__dirname, '/public')));
const mountPath = process.env.PARSE_MOUNT || '/parse';
if (!test) {
  const api = new ParseServer(config);
  app.use(mountPath, api);
}

app.get('/', function (req, res) {
  res.status(200).send(process.env.APP_NAME || 'MSA');
});
// app.get('/test', function (req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

const port = process.env.PORT || 1337;
if (!test) {
  const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server running on port ' + port + '.');
  });
  // ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
