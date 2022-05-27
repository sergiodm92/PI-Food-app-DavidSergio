const { Router } = require("express");
const { allRecipes, recipeId, recipesDb } = require("../controllers");
const router = Router();



//pedido de todas las recetas (api + d)
router.get('/', async (req, res) => {
    const { title } = req.query;

    if(title) {
               const recipes = await allRecipes();
               let value = title.toLowerCase();

               const searchTitle = recipes.filter(r => r.title.toLowerCase().includes(value));
        

               if(searchTitle.length >= 1 ) return res.json(searchTitle);
               return res.status(404).json({msg: "recipe not found"});

                } else {
                        const recipes = await allRecipes();
                        return res.status(200).json(recipes);
                }

                                    });


router.get('/:id', async(req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).send("Error, recipeId not found");
    //if(id.includes('-')) return res.send('entro aca porque incluye -')
        if (id.includes('-')) {
        //busco en la DB por Id
        const db = await recipesDb();
        const searchId = await db.find(recipe => recipe.id === id);
        return res.json(searchId);
    
        } else {
        const recipesId = await recipeId(id);
        return res.json(recipesId);
    } 
   
});








module.exports = router;