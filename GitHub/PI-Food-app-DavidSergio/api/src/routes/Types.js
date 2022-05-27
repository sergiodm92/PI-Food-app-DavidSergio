const { Router } = require('express');
const { Diet } = require("../db");
const { searchForDiets } = require('../controllers/index')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//Trae las dietas con los atributos id-title-desciption
router.get('/', async (req, res) => { 
    const types = await Diet.findAll({
        attributes: ['id', 'title', 'description']
    });
    //200 OK indica que la solicitud ha tenido éxito.
    return res.status(200).json(types);
    
});

//devuelve un array con las recetas que contiene una dieta
router.get('/:type', async (req, res) => {
    const { type } = req.params;
    const recipeDiet = await searchForDiets(type);
    if (recipeDiet) return res.json(recipeDiet);
    return res.status(404).json({ msg: "We're so sorry, diet type is not valid" })
});


module.exports = router;