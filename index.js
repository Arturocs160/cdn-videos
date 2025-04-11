const express = require('express');
const app = express();
const routes = require('./src/routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const PORT = 3095;

routes(app)

app.listen(PORT, (req,res)=>{
    console.log(`Server corriendo en el puerto ${PORT}`);
});
