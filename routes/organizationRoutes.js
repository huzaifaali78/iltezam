const express = require('express');
const router = express.Router();
const userController = require('../controllers/organizationController');


router.post('/Organization', userController.createOrganization );


module.exports = router;
