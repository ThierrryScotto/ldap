require('dotenv').config();

var ActiveDirectory = require('activedirectory');

class LDAP {
  constructor() {
    this.ad;
    this.connection();
  }

  connection() {
    var config = {
      url: process.env.LDAP_URL,
      baseDN: process.env.LDAP_BASEDN,
      username: process.env.LDAP_USERNAME,
      password: process.env.LDAP_PASSWORD
    }
    
    this.ad = new ActiveDirectory(config);
    console.log('connected');
  }

  getUser(username) {
    this.ad.findUsers(username, true, function(err, users) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }
     
      if ((! users) || (users.length == 0)) {
        console.log('No users found.');
      }

      console.log('findUsers: '+JSON.stringify(users));
    });
  }

  authenticateUser(username, password) {
    ad.authenticate(username, password, function(err, auth) {
      if (err) {
        console.log('ERROR: '+JSON.stringify(err));
        return;
      }
      
      if (auth) {
        console.log('Authenticated!');
      } else {
        console.log('Authentication failed!');
      }
    });
  }
}

module.exports = new LDAP();