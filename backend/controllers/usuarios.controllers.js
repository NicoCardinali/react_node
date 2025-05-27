const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/usuarios.json')

const leerUsuarios = () =>{
    const data = fs.readFileSync(filePath,'utf8') 
    return JSON.parse(data);
}

let usuarios = leerUsuarios()


const escribirUsuarios = (usuarios) => {
    fs.writeFileSync(filePath,JSON.stringify(usuarios, null, 2))
}

const getUsers = (req, res)=>{
    res.json({data: usuarios, status:200, message:'Usuarios obtenidos de manera exitosa'})
}


const getUsersById = (req,res)=>{
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if (!usuario) return res.json({status: 404,message:"Usuario no encontrado"})
    res.json({data: usuario, status:200, message: "Usuario encontrado"})
}

const createUsers = (req,res)=>{
    const nuevoUsuario = req.body
    const ids = usuarios.map(u => u.id)
    const nuevoId = ids.length > 0 ? Math.max(...ids) + 1 : 1
    nuevoUsuario.id = nuevoId
    usuarios.push(nuevoUsuario)
    escribirUsuarios(usuarios)
    res.json({ status: 201, data: nuevoUsuario, message: "Usuario creado con éxito" })
  }
  
const updateUsers = (req,res)=>{
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if (!usuario) return res.json({status: 404,message:"Usuario no encontrado"})
    const {nombre, email, edad} = req.body
    usuario.nombre = nombre || usuario.nombre
    usuario.email = email || usuario.email
    usuario.edad = edad || usuario.edad

    escribirUsuarios(usuarios)

    res.json({status:201, data: usuario, message:"Usuario modificado con éxito"})
}

const deleteUsers = (req,res)=>{
    let usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if (!usuario) return res.json({status: 404,message:"Usuario no encontrado"})
    usuarios = usuarios.filter(item => item.id !== usuario.id)
    escribirUsuarios(usuarios)
    res.json({status:201, message: "Usuario eliminado con éxito"})
}

module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
}