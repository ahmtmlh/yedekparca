const express = require('express')
const {authenticateToken, authenticateTokenWithUserType} = require('../middlewares/authenticate')
const ProductController = require('../controllers/Products')
const UserTypes = require('../constants/UserType')
const ProductValidations = require('../validations/Products')
const validate = require('../middlewares/validate')

const router = express.Router();

router.route('/:id').get(authenticateToken, validate(ProductValidations.productIdSchema, 'params') ,ProductController.getProductDetails)
router.route('/:id').patch(authenticateTokenWithUserType(UserTypes.manufacturer), validate(ProductValidations.updateProductSchema), ProductController.updateProduct)
router.route('/:id/addmedia').patch(authenticateTokenWithUserType(UserTypes.manufacturer), validate(ProductValidations.productIdSchema, 'params'), ProductController.addMedia)
router.route('/:id').delete(authenticateTokenWithUserType(UserTypes.manufacturer), validate(ProductValidations.productIdSchema, 'params'), ProductController.deleteProduct)
 
module.exports = router