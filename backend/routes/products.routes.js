const express = require('express')
const router = express.Router()
const {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controllers')


router.get('/', getProducts)
router.get('/:id', getProductsById)
router.post('/', createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

module.exports = router