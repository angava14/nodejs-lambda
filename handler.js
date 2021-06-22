const db = require('./db_connect');
'use strict';

module.exports.getUsers= (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  db.getById('users', event.pathParameters.id)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not find users: " + e
      })
    })
};

module.exports.getAllUsers = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  db.getAll('users')
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Users: ' + e
      })
    })

};

module.exports.createUsers = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  db.insert('users', data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "User Created! " + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not create User " + e
      })
    }) 
};

module.exports.updateUsers = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  db.updateById('users', event.pathParameters.id, data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "User Updated!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not update User" + e
      })
    }) 
};

module.exports.deleteUsers = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  db.deleteById('users', event.pathParameters.id)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "User Deleted!"
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not delete User" + e
      })
    }) 
};

module.exports.searchUsers = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  const sql = "SELECT FROM users WHERE name LIKE '%"+data.name+"%';"

  db.query(sql)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Usuario Encontrado " + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "No se encontro Usuario "  + e + "-Query-: "+ sql
      })
    }) 
};