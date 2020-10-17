require('dotenv').config();

var ActiveDirectory = require('activedirectory');

// var config = {
//   url: process.env.URL,
//   baseDN: process.env.BASEDN,
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD
// }

var config = {
  url: 'ldap://core.local',
  baseDN: 'dc=core,dc=local',
  username: 'Administrador',
  password: 'Core2020'
}

var ad = new ActiveDirectory(config);

console.log(ad);

ad.authenticate(process.env.USERNAME, process.env.PASSWORD, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }
  
  if (auth) {
    console.log('Authenticated!');
  }
  else {
    console.log('Authentication failed!');
  }
});