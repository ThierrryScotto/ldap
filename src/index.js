'use strict'

const router         = require('./router/index');
const authController = require('./controllers/authController');

router.post('/authenticate', authController.auth);



