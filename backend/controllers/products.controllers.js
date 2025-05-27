const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/productos.json')

const leerProductos = () =>{
    const data = fs.readFileSync(filePath,'utf8') 
    return JSON.parse(data);
}

let productos = leerProductos()


const escribirProductos = (productos) => {
    fs.writeFileSync(filePath,JSON.stringify(productos, null, 2))
}

const getProducts = (req, res)=>{
    res.json({data: productos, status:200, message:'Productos obtenidos de manera exitosa'})
}


const getProductsById = (req,res)=>{
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    if (!producto) return res.json({status: 404,message:"Producto no encontrado"})
    res.json({data: producto, status:200, message: "Producto encontrado"})
}

const createProduct = (req,res)=>{
    const nuevoProducto = req.body
    const ids = productos.map(p => p.id)
    const nuevoId = ids.length > 0 ? Math.max(...ids) + 1 : 1
    nuevoProducto.id = nuevoId
    productos.push(nuevoProducto)
    escribirProductos(productos)
    res.json({ status: 201, data: nuevoProducto, message: "Producto creado con éxito" })
  }
  

const updateProduct = (req,res)=>{
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    if (!producto) return res.json({status: 404,message:"Producto no encontrado"})
    const {nombre, precio} = req.body
    producto.nombre = nombre || producto.nombre
    producto.precio = precio || producto.precio
    
    escribirProductos(productos)

    res.json({status:201, data: producto, message:"Producto modificado con éxito"})
}

const deleteProduct = (req,res)=>{
    let producto = productos.find(item => item.id === parseInt(req.params.id))
    if (!producto) return res.json({status: 404,message:"Producto no encontrado"})
    productos = productos.filter(item => item.id !== producto.id)
    escribirProductos(productos)
    res.json({status:201, message: "Producto eliminado con éxito"})
}

module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
}