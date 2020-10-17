'use strict'

const router         = require('./router/index');
const ldapController = require('./controllers/ldapController');

router.post('/user/authenticate', ldapController.auth);
router.get('/users/group/:groupName', ldapController.getGroupMembershipForGroup);



