import axios from 'axios';
import swal from 'sweetalert';
import recipenotfound from '../img/recipe not found.png'



const GET_RECIPES = "GET_RECIPES";
const GET_RECIPES_NAME = "GET_RECIPES_NAME";
const GET_RECIPES_ID = "GET_RECIPES_ID";
const GET_DIETS = "GET_DIETS";
const GET_RECIPES_FOR_DIET ="GET_RECIPES_FOR_DIET";
const ORDER_RECIPE_BY_NAME = "ORDER_RECIPE_BY_NAME";
const ORDER_RECIPE_BY_HSCORE = "ORDER_RECIPE_BY_HSCORE";
const CREATE_RECIPE = "CREATE_RECIPE";
const GET_DIET_TYPES ="GET_DIET_TYPES";
const GET_RECIPES_CREATE = "GET_RECIPES_CREATE";
const GET_RECIPES_API = "GET_RECIPES_API";
const DELETE_RECIPES = "DELETE_RECIPES";
const SWICH_LOADING = "SWICH_LOADING"
const URL = "http://localhost:3002/";

//-------------------------------
//con async await
// export function getRecipes(){
//     return async (dispatch)=>{
//         let rec = await axios.get(`${URL}recipes`);
//         return dispatch({
//             type:GET_RECIPES,
//             payload:rec.data
//         })
//     }
// }


//con promise
export function getRecipes(){
    return (dispatch)=>{
        axios.get(`${URL}recipes`)
        .then((response)=>{
            return dispatch({
            type:GET_RECIPES,
            payload:response.data
        })})
        
    }
}
//-----------------------------------



export const getRecipesId = (id) => {
    return async (dispatch) => {
       
        try {
            const recipes = await axios.get(`${URL}recipes/${id}`);
            return dispatch({ type: GET_RECIPES_ID, payload: recipes.data });
        } catch (e) {
            console.log(e);
            return dispatch({ type: GET_RECIPES_ID, payload: [] });
        }
    };
}




export const getDiets = () => {
    return async (dispatch) => {
      
        try {
            const diets = await axios.get(`${URL}types`);
            return dispatch({ type: GET_DIETS, payload: diets.data });
        } catch (e) {
            console.log(e);
            return dispatch({ type: GET_DIETS, payload: [] })
        }
    };
};

export const getRecipesForDiet = (diet) => {
   
    return async (dispatch) => {
        
        try {
            
            const recipes = await axios.get(`${URL}types/${diet}`);
            return dispatch({ type: GET_RECIPES_FOR_DIET, payload: recipes.data });
        } catch (e) {
            console.log(e);
            return dispatch({ type: GET_RECIPES_FOR_DIET, payload: [] });
        }
    };
};
export const orderByName = (payload) => {
 
return ({ type: ORDER_RECIPE_BY_NAME, payload  });
       
    };

export const orderByHScore= (payload) => {
 
        return ({ type: ORDER_RECIPE_BY_HSCORE, payload  });
               
            };


export function getDietTypes(){
    return async function (dispatch){
        try{
            const json2 = await axios.get(`${URL}types`);
            return dispatch ({
                type:GET_DIET_TYPES,
                payload: json2.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}
export function postRecipe(payload){
    return async function (dispatch){
        try{
            const json = await axios.post(`${URL}recipe`, payload);
            return dispatch ({
                type:CREATE_RECIPE,
                payload: json
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getRecipesName(name){
    return function(dispatch){
      
            axios.get(`${URL}recipes?title=`+name) 
            .then(responese=>{return dispatch({
                type: GET_RECIPES_NAME, 
                payload: responese.data
            })})

            .catch(function(){ swal({
                title: "ERROR",
                text: "Recipe not found",
                icon: recipenotfound,
                dangerMode: true,
                buttons: "CLOSE"
              });})
            
        }
    }       

    export function recipesCreate(){
        return (dispatch)=>{
            axios.get(`${URL}recipescreate`)
            .then((response)=>{
                return dispatch({
                type:GET_RECIPES_CREATE,
                payload: response.data
            })})
            
        }
    }

    export function recipesapi(){
        return (dispatch)=>{
            axios.get(`${URL}recipesapi`)
            .then((response)=>{
                return dispatch({
                type:GET_RECIPES_API,
                payload: response.data
            })})
            
        }
    }


    export function deleteRecipe(id) {
        return async (dispatch) => {
          try {
            const response = await axios.delete(`${URL}recipe/${id}`);
            if(response)return dispatch(getRecipes())
            } catch (error) {
            console.log(error);
          }
        };
      }


    export const swich_loading = (e) => {
 
        return ({ type: SWICH_LOADING, payload: e  });
               
            };
