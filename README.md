##Recipe Directory API

***

###Description

This describes the resources that make up the **RecipeDirectory**

If you have any problem or requests, please contact either [Abimbola](mailto:abimbola.idowu@andela.co) or [Mirabel](mailto:mirabel.ekwenugo@andela.co)
###

***

**Root endpoint**

> https://recipe-directory.herokuapp.com/api/

***
##Recipes

###Get Recipes

**To get all recipes**

> Method: "GET"
> /recipes

**To get a single recipe**

> Method: "GET"
> /recipe/id

###Post Recipes

> Method: "POST"
>/recipes

fields accepted in post
name: **required**
cuisine: **optional**
equipment: **required**, several equipments are seperated by comma
ingredient: **required**, several ingredients are seperated by comma
method: **required**, several methods are seperated by comma

###Edit a recipe

> Method: "PUT"
> /recipe/id/edit

fields accepted in post
name: **optional**
cuisine: **optional**
equipment: **optional**, several equipments are seperated by comma
ingredient: **optional**, several ingredients are seperated by comma
method: **optional**, several methods are seperated by comma


***

##Developers

![Mirabel Ekwenugo](https://avatars2.githubusercontent.com/u/9656531?v=3&s=460 "Mirabel Ekwenugo")

![Abimbola Idowu](https://avatars2.githubusercontent.com/u/9654923?v=3&s=460 "Abimbola Idowu")
