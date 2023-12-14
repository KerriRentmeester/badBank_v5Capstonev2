// admin configuration
const admin = require('firebase-admin');

// load the service acct key from JSON
const serviceAccount = require("./AuthRoutes.json");

// initialize FB Admin SDK w/ provided service acct credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// export configured admin object
module.exports = admin;