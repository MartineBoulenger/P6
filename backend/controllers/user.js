/*LOGIQUE METIER POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */
//Importation du package de cryptage des mots de passe
const bcrypt = require('bcrypt');
//Importation du package qui permet de créer et de vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');
//Importation du package qui permet de cryptage 
const cryptojs = require('crypto-js');

//Importation du modèles User
const User = require('../models/User');
//Fontion qui gère la logique métier de la route POST (inscription d'un nouvel user)
exports.signup = (req, res, next) => {
  //regex pour exiger un mot de passe fort d'au moins 8 caractères dont une majuscule, des chiffres et un caractère spécial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/; 
  const password = req.body.password;
  //const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPTION_KEY).toString();

  if (password.match(regex)) {
  bcrypt.hash(password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  } else {
    throw new Error("Le mot de passe n'est pas assez sécurisé");
  }
};
//Fontion qui gère la logique métier de la route POST (connexion d'un user existant dans la database)
exports.login = (req, res, next) => {
  //const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPTION_KEY).toString();
  //Recherche de l'utilisateur dans la DB via son email 
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //Si on a trouvé le mail dans la DB, on compare le hash du nouveau mot de passe au hash de la DB
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            //encodage et renvoi au frontend d'un nouveau token contenant le userId en tant que payload
            userId: user._id,//ATTENTION USER ID !
            //Encodage d'un nouveau token
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};