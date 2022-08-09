const { Router } = require("express");
const { allRecipes, recipeId, recipesDb } = require("../controllers");
const router = Router();


router.get('/', async (req, res) => {
   
    const recipescreate = await recipesDb();

    if(recipescreate.length) {
    return res.json(recipescreate);
        

    } else  { return res.status(404).json({msg: "recipe not found"})
                
            }
    })

module.exports = router;
