// =================
// Puerto
// =================


process.env.PORT = process.env.PORT || 3000;

// =================
// Entorno
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =================
// Base de datos
// =================
let urlDB;

process.env.NODE_ENV === 'dev' ?
    urlDB = 'mongodb://localhost:27017/cafe' :
    urlDB = 'mongodb+srv://dbCesar:HCwZZr0H0eTlGIjb@cluster0.p5ed7.mongodb.net/cafe';

process.env.URLDB = urlDB;