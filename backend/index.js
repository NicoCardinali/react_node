const express = require('express')
const cors = require('cors')

const app = express()

const port = 3000

app.use(cors())
app.use(express.json())

const productRouter = require('./routes/products.routes')
app.use('/productos',productRouter)

const userRouter = require('./routes/users.routes')
app.use('/usuarios',userRouter)

app.listen(port, () => {
    console.log(`Servidor corriendo en localhost: ${port}`)
})
