const express = require("express");
const app = express();
const routes = require("./routes");
const ProductsWebSocket = require("./ProductsWebSocket");
const PersistenciaChat = require('./persistencia/PersistenciaChat')
const PersistenciaProducto = require('./persistencia/PersistenciaProducto')
const handlebars = require("hbs");
const mongoose=require('mongoose')
handlebars.registerHelper("raw-helper", function(options) {
    return options.fn(this);
})


//conecto la base de datos
CRUD()

async function CRUD(){
    const URL='mongodb://localhost:27017/ecommerce'
    let rta =await mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("BASE DE DATOS CONECTADA")
}
// importo las rutas de vistas
const productRoutes = require("./productRoutes");
const { async } = require("regenerator-runtime");


// Uso handlebars
app.set("view engine", "hbs");
// https://www.geeksforgeeks.org/handlebars-templating-in-expressjs/#:~:text=To%20use%20handlebars%20in%20express,pages%20in%20the%20views%20folder.&text=Now%2C%20we%20need%20to%20change%20the%20default%20view%20engine.&text=Now%2C%20we%20render%20our%20webpage%20through%20express%20to%20the%20local%20server.
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.render("index");
});

// registro las rutas para las vistas
app.use("/productos", productRoutes);





// Inicializo el web socket
ProductsWebSocket.inicializar();

app.listen(8080, () => {
    console.log("El servidor está escuchando en el puerto 8080")
})