var express = require('express');
var mongoose = require('mongoose');
require('../models/db');
var Recipe = mongoose.model('Recipe');

//created app router
var router = express.Router();
router
  .get("/", function(request,response) {
    Recipe
      .find(function(err, recipes) {
        if(err) {
          response.status(404).json(err);
        }
        response.json(recipes)
      });
      // .exec(function(err, recipes) {
      //   if (err) {
      //     response.status(404).json("can't get recipes");
      //   }
      //   response.status(200)
      //   response.json(recipes)
      // });

  })

  .post('/', function(request, response) {
    var newRecipe = {
        name: request.body.name,
        cuisine: request.body.cuisine,
        equipments: request.body.equipments,
        ingredients: request.body.ingredients,
        method: request.body.method
      }
    Recipe.create(newRecipe, function(err, newRecipes) {
      if(err) {
        return handleError(err)
      }
      response.status(201).json(newRecipe)
    })
  })

  // .post("/", function(request, response) {
  //   var newRecipe = request.body;
  //   recipesList.push(newRecipe);
  //   response.status(201).json(recipesList);

  // })

  .put('/edit/:id',function(request, response) {
    Recipe
      .findById(request.params.id)
      .exec(function(err, recipes) {
          recipes.name = request.body.name;
          recipes.cuisine = request.body.cuisine;
          recipes.equipments = request.body.equipments;
          recipes.ingredients = request.body.ingredients;
          recipes.method = request.body.method;
          recipes.save();
          response.status(200).json(recipes)
      })
  })

  // .put("/:id/edit", function(request, response) {
  //   for(var i = 0; i < recipesList.length; i++) {
  //     if (request.params.id === recipesList[i].id) {
  //       recipesList[i].name = request.body.name;
  //       recipesList[i].description = request.body.description;
  //       break;
  //     } else {
  //       response.send("Not a recipe");
  //     }
  //   };
  //   response.status(200).json(recipesList);
  // })


  .delete('/delete/:id',function(request, response) {
    Recipe
      .findOneAndRemove({id:request.params.id}, function(err) {
        if(err) {
          response.send(err);
        }
        response.send("deleted!");
      });
  });

  // .delete("/:id/delete", function(request, response) {
  //   for(var i = 0; i < recipesList.length; i++) {
  //     if (request.params.id === recipesList[i].id) {
  //       recipesList.splice(i,1);
  //       break;
  //     }
  //   };
  //     response.status(200).json(recipesList);
  // });

  module.exports = router