const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')

const Sauce = require('./models/Sauce');

//connexion à la base de données MongoDB

require('dotenv').config();

const mongoose = require('mongoose');
/* const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const dbName = process.env.DB_NAME */


mongoose
  .connect(
    `mongodb+srv://`+ process.env.DB_USER +`:` + process.env.DB_PASSWORD +`@` + process.env.DB_HOST + `/` + process.env.DB_NAME + `?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

/* app.use(mongoSanitize({
  replaceWith: '_'
})) */

//rendre les images accessibles publiquement pour toutes les requêtes vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes)

module.exports = app;