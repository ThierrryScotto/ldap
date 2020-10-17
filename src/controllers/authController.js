'use strict'

const { use } = require('../router');
const ldap    = require('../service/ldap');

const auth = async (req, res) => {
  const { username, password } = req.body;

  const user = await ldap.getUser(username);

  if (!user) {
    return res.status(404).send({ message: `User ${username} not found`})
  }

  const isValid = await ldap.authenticateUser(user.displayName, password);

  if (!isValid) {
    return res.status(403).send({ message: 'Error authenticating user in AD'})
  }

  const responseBody = {
    name: user.givenName,
    lastName: user.sn,
    username: user.sAMAccountName,
    email: user.userPrincipalName
  }

  return res.status(200).send({ user : responseBody });
};

module.exports = {
  auth
}