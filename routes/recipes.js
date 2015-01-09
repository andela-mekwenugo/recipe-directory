var express = require('express');
var mongoose = require('mongoose');
require('../models/db');
var Recipe = mongoose.model('Recipe');

var sendResponse = function(response, status, data) {
  response.status(status);
  response.json(data);
}
var trimSpaces = function(data) {
  var data = data
  data = data.replace(/ /g, "");
  return splitData(data);
}
var splitData = function(data) {
  return data.split(",");
}
//created app router
var router = express.Router();

router.route('/recipes')
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
    if (!request.body.name || !request.body.equipments || !request.body.ingredients || !request.body.method) {
      sendResponse(response, 400, "name, equipments, ingredients and method fields are required and cannot be empty")
    }
    var newRecipe = {
        name: request.body.name,
        cuisine: request.body.cuisine,
        equipments: trimSpaces(request.body.equipments),
        ingredients: trimSpaces(request.body.ingredients),
        method: trimSpaces(request.body.method)
      }
    Recipe.create(newRecipe, function(err, newRecipes) {
      if(err) {
        sendResponse(response, 404, err);
      }
      sendResponse(response, 201, newRecipe);
    })
  });
router
  .put('recipe/:id/edit',function(request, response) {
    Recipe
      .findById(request.params.id)
      .exec(function(err, recipes) {
          recipes.name = request.body.name || recipes.name;
          recipes.cuisine = request.body.cuisine || recipes.cuisine;
          recipes.equipments = request.body.equipments || recipes.equipments;
          recipes.ingredients = request.body.ingredients || recipes.ingredients;
          recipes.method = request.body.method || recipes.method;
          recipes.save();
          sendResponse(response, 200, recipes);
      })
    })
  .delete('recipe/:id/delete',function(request, response) {
    Recipe
      .findOneAndRemove({id:request.params.id}, function(err) {
        if(err) {
          sendResponse(response, 404, err);
        }
        sendResponse(response, 204, "deleted successfully")
      });
  });

module.exports = router