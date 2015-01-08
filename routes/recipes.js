var express = require('express');
var recipesList = [
{
  "name":"salad",
  "id" : "1",
  "description" : "Made with carrot and cabbage"
},

{
  "name" : "beans",
  "id" : "2",
  "description": "Very high in protein"
},

{
  "name" : "stew",
  "id" : "3",
  "description" : "Mainly used to eat rice"
},

{
  "name" : "pizza",
  "id" : "4",
  "description" : "Round bread garnished with vegetables and cheese"
}, 

{
  "name" : "rice",
  "id" : "5",
  "description" : "Very high in protein"
}]

//created app router
var router = express.Router();
router
  .get("/", function(request,response) {
    response.status(200).json(recipesList);

  })

  .post("/", function(request, response) {
    var newRecipe = request.body;
    recipesList.push(newRecipe);
    response.status(201).json(recipesList);

  })

  .put("/:id/edit", function(request, response) {
    for(var i = 0; i < recipesList.length; i++) {
      if (request.params.id === recipesList[i].id) {
        recipesList[i].name = request.body.name;
        recipesList[i].description = request.body.description;
        break;
      } else {
        response.send("Not a recipe");
      }
    };
    response.status(200).json(recipesList);
  })

  .delete("/:id/delete", function(request, response) {
    for(var i = 0; i < recipesList.length; i++) {
      if (request.params.id === recipesList[i].id) {
        recipesList.splice(i,1);
        break;
      }
    };
      response.status(200).json(recipesList);
  });

  module.exports = router