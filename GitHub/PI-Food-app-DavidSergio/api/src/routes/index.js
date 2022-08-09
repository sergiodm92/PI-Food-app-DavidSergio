const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes = require('./Recipes');
const recipescreate = require('./recipescreate');
const Types = require("./Types");
const Recipe = require("./Recipe");
const recipesapi = require("./recipesapi");




const { route } = require('./Recipes');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/recipe", Recipe);

//Montamos las rutas...

//Todas las recetas
router.use("/recipes", Recipes);

router.use("/recipescreate", recipescreate);

router.use("/recipesapi", recipesapi);

//traer tipos de dietas
router.use("/types", Types);

//ruta para crear recetas
router.use("/recipe", Recipe);





router.get("*", (req, res) => {
  res.status(404).send("ERROR ROUTE NOT FOUND ");
});

module.exports = router;
