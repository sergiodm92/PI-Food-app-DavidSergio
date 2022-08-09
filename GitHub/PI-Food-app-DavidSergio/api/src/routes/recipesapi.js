const { Router } = require("express");
const { recipesApi } = require("../controllers");
const router = Router();


router.get('/', async (req, res) => {
   
    const recipesapi = await recipesApi();

    if(recipesapi.length) {
    return res.json(recipesapi);
        

    } else  { return res.status(404).json({msg: "recipe not found"})
                
            }
    })

module.exports = router;
