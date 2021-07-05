const express = require('express');
const router = require('express-promise-router')();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

//const { validateParam } = require('../helpers/routeshelpers');

const UserController = require('../controllers/todo');

const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

const checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and 
	// the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
	  cache: true,
	  rateLimit: true,
	  jwksRequestsPerMinute: 5,
	  jwksUri: `https://pukkie.us.auth0.com/.well-known/jwks.json`
	}),
  
	// Validate the audience and the issuer.
	audience: 'https://example-api',
	issuer: [`https://pukkie.us.auth0.com/`],
	algorithms: ['RS256']
  });


/*router.route('/')
	.get(UserController.index)
	.post(UserController.newUser)

router.route('/:userEmail')
	.get(UserController.getUser)
	.delete(UserController.deleteUser)*/

router.route('/:userEmail/todos')
	.get(checkJwt, UserController.getUserTodos)
	.post(checkJwt, UserController.newUserTodo)
	// .get()

router.route('/:userEmail/todos/:todoId')
	.delete(checkJwt, UserController.deleteUserTodo)
	.patch(checkJwt, UserController.updateUserTodo)
	// .get()

module.exports = router;