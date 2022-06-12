const express = require('express')
const {authenticateToken, authenticateTokenWithUserType} = require('../middlewares/authenticate')
const ProductController = require('../controllers/Products')

const router = express.Router();

router.route('/:id').get(authenticateToken, ProductController.getProductDetails)
router.route('/:id').patch(authenticateTokenWithUserType(UserTypes.manufacturer), ProductController.updateProduct)
router.route('/:id/addmedia').patch(authenticateTokenWithUserType(UserTypes.manufacturer), ProductController.addMedia)
router.route('/:id').delete(authenticateTokenWithUserType(UserTypes.manufacturer), ProductController.deleteProduct)
 
module.exports = router