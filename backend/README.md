# Création d’une API sécurisée pour une application 

## Pour commencer

### Frontend :

```
git clone git@github.com:OpenClassrooms-Student-Center/dwj-projet6.git front 
cd frontend
npm install 
npm start
```
assurez vous d'avoir  `node-sass` installé dans sa globalité

### Backend :

```
git clone git@github.com:marieparet/so-pekocko.git back
cd backend
npm install
nodemon server
```

Avant d’accéder à l’application, vous devrez créer un fichier '.env' dans le répertoire racine (dossier 'backend').  
À l’intérieur de ce nouveau fichier, ajoutez des variables spécifiques à l’environnement sur de nouvelles lignes sous forme de NAME=VALUE, comme ci-dessous :

```
DB_USER='your MongoDB id'
DB_PASSWORD='your MongoDB password to access your cluster'
```

Then open on any web browser : http://localhost:4200/

## API documentation

https://documenter.getpostman.com/view/13023621/TVYDcyHX

## What is this project ?

This is the Project number 6 of the OpenClassrooms' Web Developer course, in which I had to build a secure API for a food review app using below techs :
- For the server : Node.js and the Express framework
- For the database : MongoDB and the Mongoose plugin

The frontend part was already developed, so I was in charge of developing the backend part of the app.

## What did I learn ?

Building a REST API allowed me to apply my JavaScript knowledge to the backend development of an application, using Node.js, Express and MongoDB.

I also learnt how to identify and apply basic security rules to the developpement of an application, in order to comply with the OWASP and RGPD standards.  
In order to meet these requirements in terms of security, I used (among others) below packages :
- **bcrypt**, in order to hash and salt a password
- **jsonwebtoken**, in order to ensure secure authentification on all requests
- **mongoose-unique-validator**, in order to ensure an email address' uniqueness and to return errors
- **dotenv**, in order to store and secure database credentials
- **crypto-js**, in order to protect users' email addresses, to comply with the RGPD rules
- **express-mongo-sanitize**, in order to counter injection attacks, by validating the entries.
