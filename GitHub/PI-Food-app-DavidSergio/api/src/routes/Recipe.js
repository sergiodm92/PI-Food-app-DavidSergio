const { Router } = require("express");
const { Recipe} = require("../db");
const {setDiets}= require("../controllers/index")
const router = Router();

//
router.post('/', async (req, res) => {
    const { title, summary, score, healthScore, instructions, diets, image, readyInMinutes } = req.body;
 

    //Validación de (title/summary/dietas)
    if(!title || !summary || !(diets.length >= 1)) return res.json({msg: 'missing data'});

    try {
          const createRecipe = await Recipe.create({
          title,
          summary,
          score,
          healthScore,
          instructions,
          image,
          readyInMinutes,
          
        });

//carga las dietas en la base de datos
    createRecipe.setDiets(diets);

    //devuelve la receta creada
    res.json(createRecipe);

  } catch (error) {
    return res.status(404).json("ERROR CREATING RECIPE");
  }
});


module.exports = router;

