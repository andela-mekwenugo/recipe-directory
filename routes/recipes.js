var express = require('express');
var mongoose = require('mongoose');
require('../models/db');
var Recipe = mongoose.model('Recipe');

//sends response to client
var sendResponse = function(response, status, data) {
  response.status(status);
  response.json(data);
}

//trims whitespaces from client data
var trimSpaces = function(data) {
  var data = data
  data = data.replace(/(^ +)/, "");
  data = data.replace(/( +$)/g, "");
  data = data.replace(/(, )/g, ",");
  return splitData(data);
}

//split data in array as required by database
var splitData = function(data) {
  return data.split(",");
}
//created app router
var router = express.Router();

//define api route
router.route('/recipes')
  //base_URL/api/recipes , METHOD=get
  .get(function(request,response) {
    Recipe
      .find(function(err, recipes) {
        if(err) {
          sendResponse(response, 404, err);
        }
        sendResponse(response, 200, recipes);
      });

  })
  .post(function(request, response) {
    if (!request.body.name || !request.body.equipment || !request.body.ingredient || !request.body.method) {
      sendResponse(response, 400, "name, equipment, ingredient and method fields are required and cannot be empty")
    }
    var newRecipe = {
        name: trimSpaces(request.body.name),
        cuisine: trimSpaces(request.body.cuisine),
        equipment: trimSpaces(request.body.equipment),
        ingredient: trimSpaces(request.body.ingredient),
        method: trimSpaces(request.body.method)
      }
    Recipe.create(newRecipe, function(err, newRecipes) {
      if(err) {
        sendResponse(response, 404, err);
      }
      sendResponse(response, 201, newRecipe);
    })
  });

router.route('/recipe/:id/edit')
  //base_URL/api/recipe/id/edit , METHOD=put
  .put(function(request, response) {
    Recipe
      .findById(request.params.id)
      .exec(function(err, recipes) {
          recipes.name = trimSpaces(request.body.name) || recipes.name;
          recipes.cuisine = trimSpaces(request.body.cuisine) || recipes.cuisine;
          recipes.equipment = trimSpaces(request.body.equipment) || recipes.equipment;
          recipes.ingredient = trimSpaces(request.body.ingredient) || recipes.ingredient;
          recipes.method = trimSpaces(request.body.method) || recipes.method;
          recipes.save();
          sendResponse(response, 200, recipes);
      })
    })
  //base_URL/api/recipe/id/delete , METHOD=delete
router.route('/recipe/:id/delete')
  .delete(function(request, response) {
    Recipe
      .findOneAndRemove({'_id': request.params.id}, function(err) {
        if(err) {
          sendResponse(response, 404, err);
        }
        sendResponse(response, 200, "deleted successfully")
      });
  });

//exports router to app.js
module.exports = router