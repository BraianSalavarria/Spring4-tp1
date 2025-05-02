import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import expressEjsLayouts from "express-ejs-layouts";

// Esto permite usar __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configuración Express-ejs-layout
app.use(expressEjsLayouts);
app.set('layout', path.join('partials', 'layout')); // Correcto

//conexion a la base de datos
connectDB();

//archivos estaticos
app.use(express.static('public'));

app.use('/api', superHeroRoutes);
app.use( (req, res) => {
    res.status(404).send({mensaje: 'ruta no encotrada'});
});

//Importante: Para levantar el servidor en render es necesario configurar el puerto http al que render va a escuchar
//En este caso es 
app.listen(PORT, '0.0.0.0',() => {
    console.log(`servidor levantado en el puerto: ${PORT}, desde el servidor`);
})  

