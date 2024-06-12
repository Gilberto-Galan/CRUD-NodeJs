import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pRoutes from './routes/personas.routes.js';

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    extname: '.hbs',
    layoutsDir: join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    partialsDir: join(app.get('views'), 'partials')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(pRoutes);

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
