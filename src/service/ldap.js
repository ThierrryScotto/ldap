'use strict'

require('dotenv').config();

var ActiveDirectory = require('activedirectory');
const { promisify } = require('util');

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

  async promiseFunction(functionName) {
    const newPromiseFunction = await promisify(functionName).bind(this.ad);
    return newPromiseFunction;
  }

  async authenticateUser(username, password) {
    if (username) {
      const authenticateAsync = await this.promiseFunction(this.ad.authenticate);
      if (authenticateAsync) {
        return await authenticateAsync(username, password);
      }
    }
  };

  async checkUser(username) {
    if (username) {
      const userExistsAsync = await this.promiseFunction(this.ad.userExists);
      if (userExistsAsync) {
        return await userExistsAsync(username);
      }
    }
  };

  async getUser(username) {
    if (username) {
      const findUserAsync = await this.promiseFunction(this.ad.findUser);
      if (findUserAsync) {
        return await findUserAsync(username);
      }
    }
  };
}

module.exports = new LDAP();