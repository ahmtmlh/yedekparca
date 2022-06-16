const express = require('express');
const UserTypes = require('../constants/UserType');
const {authenticateToken, authenticateTokenWithUserType} = require("../middlewares/authenticate")
const validate = require('../middlewares/validate')
const ManufacturerController = require('../controllers/Manufacturers')
const ProductValidations = require('../validations/Products');
const ManufacturerValidations = require('../validations/Manufacturers');

const router = express.Router();

router.route('/addproduct').put(authenticateTokenWithUserType(UserTypes.manufacturer), validate(ProductValidations.addProductSchema), ManufacturerController.addProduct)
router.route('/').patch(authenticateTokenWithUserType(UserTypes.manufacturer), validate(ManufacturerValidations.manufacturerSchema), ManufacturerController.updateManufacturer)
router.route('/products').get(authenticateTokenWithUserType(UserTypes.manufacturer), validate(ManufacturerValidations.manufacturerCategoriesSchema), ManufacturerController.getProducts)
router.route('/search').get(authenticateToken, ManufacturerController.search)

module.exports = router
