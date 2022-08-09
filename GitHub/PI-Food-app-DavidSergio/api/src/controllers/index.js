require('dotenv').config();
const {results} = require("../routes/recipes2.json")
const { Recipe, Diet } = require("../db");
const axios = require('axios').default;
const { API_KEY } = process.env;

const recipesDb = async () => {
    try {
        const recipesAll = await Recipe.findAll({
            include : {
                model : Diet,
                attributes: ['title']
            }
        });
        const recipes = recipesAll.map((r) => {
            return {
                id: r.id,
                title: r.title,
                summary: r.summary,
                score: r.score,
                healthScore: r.healthScore,
                instructions: r.instructions,
                image: r.image,
                diets: r.diets.map(diet => diet.title),
                readyInMinutes: r.readyInMinutes
            };
        })
        return recipes
    } catch(error){
        console.log(error);
        return false;
    }
};


const recipesApi = async function () {
    try {


//      --->COMENTAR SI NO FUNCIONA LA API<---   
//--------------------------------------------    

    // const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    // const recipes = res.data.results;

    //-------------------------------





//      --->DESCOMENTAR SI NO FUNCIONA LA API<---
//--------------------------------------------   
const recipes= results
//--------------------------------------------



        return recipes.map(r => {
            return {
                id: r.id,
                title: r.title,
                score: r.spoonacularScore,      
                healthScore: r.healthScore,     
                image: r.image,
                diets: r.diets,
                readyInMinutes: r.readyInMinutes,
                summary: r.summary,
                instructions: r.instructions,                
            };
        });

    } catch (e) {
        console.log(e);
        return [];
    };
};


const recipeId = async (id) => {
    try {


//      --->DESCOMENTAR SI NO FUNCIONA LA API<---
//--------------------------------------------       
        let r = await results.filter( e => e.id == id )
        if(r.length){
            const recipeId = {
                id: r[0].id,
                title: r[0].title,
                score: r[0].spoonacularScore,      
                healthScore: r[0].healthScore,    
                image: r[0].image,
                summary: r[0].summary,
                instructions: r[0].instructions,
                diets: r[0].diets,
                readyInMinutes: r[0].readyInMinutes,                 
            };
            return recipeId;
        
        }
//---------------------------------------------


//      --->COMENTAR SI NO FUNCIONA LA API<---   
//-------------------------------------------- 

        // const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        // const r = recipe.data;
        // const recipeId = {
        //     id: r.id,
        //     title: r.title,
        //     score: r.spoonacularScore,      
        //     healthScore: r.healthScore,    
        //     dishTypes: r.dishTypes,      
        //     image: r.image,
        //     summary: r.summary,
        //     instructions: r.instructions,
        //     diets: r.diets,
        //     readyInMinutes: r.readyInMinutes,                 
        // };
        // return recipeId;
//-----------------------------------------------

    } catch (e) {
        return false
    };
}


//función que suma las recetas de la base de datos con la api
const allRecipes = async () => {
    const rApi = await recipesApi()
    const rBd = await recipesDb();
    console.log("BD",rBd)
    console.log("API",rApi)
    
    const allRecipes = [...rBd, ...rApi];

    return allRecipes;
}


let typesDiets = [
    'gluten free',
    'ketogenic',
    'dairy free',
    'lacto ovo vegetarian',
    'Low-fodmap',
    'Vegan',
    'Pescatarian',
    'paleolithic',
    'primal',
    'Whole 30',
    'vegetarian',
];

const setDiets = async () => {

    let diets = typesDiets.map(d => { title : d});


    let dietsArray = await Diet.bulkCreate(diets);
    return dietsArray;
}


//todas las recetas que comtiene una dieta requerida
const searchForDiets = async (diet) => {
    const recipes = await allRecipes();
    const dietsFilter = recipes.filter(recipe => {
        let check = false;
        recipe.diets.forEach(e => {
            if (e.toLowerCase().includes(diet.toLowerCase())) check = true;
        })

        return check;
    });
    
    return dietsFilter;
};

const deleteRecipe = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Recipe.destroy({where:{id:id}});
      res.status(200).send("response");
    } catch (error) {
      next({ message: error.name });
    }
  };



module.exports = {
    allRecipes,
    recipesApi,
    recipesDb,
    recipeId,
    setDiets,
    searchForDiets,
    deleteRecipe
}