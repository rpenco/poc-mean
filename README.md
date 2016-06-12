# POC d'une todolist fullstack M.E.A.N

Proof of concept d'une todolist M.E.A.N (MongoDB, ExpressJS, AngularJS, NodeJS) avec mise en oeuvre des frameworks MDL (Material Design Ligth), Karma, Jasmine, Mocha.

![](https://raw.githubusercontent.com/khips/poc-todolist-angularjs-mongodb/master/screenshot.png)

## Techonologies

###Backend

- [MongoDB](https://www.mongodb.org/) - Base de données NoSQL 
- [NodeJS](https://nodejs.org/) - Utilisé comme un serveur HTTP
- [ExpressJS](http://expressjs.com/) - Utilisé pour la mise en oeuvre de l'API


###Frontend

- [AngularJS](https://angularjs.org/) - Framework Javascript
- [Material Design Lite (MDL)](http://www.getmdl.io/) - Framework graphique

###Test
 
- [Karma](http://karma-runner.github.io/)/[Jasmine](http://jasmine.github.io/) - Tests JS pour AngularJS 
- [Mocha](http://mochajs.org/) - Tests NodeJS pour l'API


## Installation

```
$ git clone git@github.com:khips/poc-todolist-angularjs-mongodb.git
$ cd ./poc-todolist-angularjs-mongodb
$ npm install
$ sudo npm install -g nodemon
$ sudo npm install -g karma
$ sudo npm install -g mocha
```	

## Exécution

```
$ nodemon
```

## Tests

Backend/API (NodeJS):

```
$ cd ./test/nodejs/
$ mocha todo.test.js
```

Frontend (AngularJS):

```
$ cd ./test/angular/ 
$ karma start
```
