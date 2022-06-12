const express = require('express');
const UserTypes = require('../constants/UserType');
const {authenticateToken, authenticateTokenWithUserType} = require("../middlewares/authenticate")
const validate = require('../middlewares/validate')
const ManufacturerController = require('../controllers/Manufacturers')

const router = express.Router();

router.route('/addproduct').put(authenticateTokenWithUserType(UserTypes.manufacturer), ManufacturerController.addProduct)
router.route('/').patch(authenticateTokenWithUserType(UserTypes.manufacturer), ManufacturerController.updateManufacturer)

module.exports = router
