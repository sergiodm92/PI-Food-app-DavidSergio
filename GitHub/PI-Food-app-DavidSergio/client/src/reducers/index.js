const initialState = {
    recipes: [],
    recipesByName: [],
    recipeById: {},
    diets: [],
    dietTypes:[],

   
  };
  
const reducer = (state = initialState, action) => {
 switch (action.type) {
   case "GET_RECIPES":
     return {
     ...state,
     recipes: action.payload,
            };
   case "GET_RECIPES_NAME":
      return {
      ...state,
      recipes: action.payload,
             };
      case "GET_RECIPES_ID":
        return {
          ...state,
          recipeById: action.payload,
        };
           case "GET_DIETS":
        return {
          ...state,
          diets: action.payload,
        };
       case "GET_RECIPES_FOR_DIET":
              return {
                  ...state,
                  recipes: action.payload
              };
       case "ORDER_RECIPE_BY_NAME":
              const arrayorder=action.payload==="az"?
              state.recipes.sort(function(a,b){
                if(a.title.toLowerCase()>b.title.toLowerCase()){return 1}
                if(a.title.toLowerCase()<b.title.toLowerCase()){return -1}
                return 0}) :  
                state.recipes.sort(function(a,b){
                if(a.title.toLowerCase()>b.title.toLowerCase()){return -1}
                if(a.title.toLowerCase()<b.title.toLowerCase()){return  1}
                return 0})
                return{
                ...state,
                recipes:arrayorder
                }
                
        case "ORDER_RECIPE_BY_HSCORE":
          const arrayorderscore = action.payload==='worst'?
          state.recipes.sort(function(a,b){
            if(a.healthScore>b.healtScore){return 1}
            if(a.healthScore<b.healthScore){return -1}
            return 0}) : state.recipes.sort(function(a,b){
              if(a.healthScore>b.healthScore){return -1}
              if(a.healthScore<b.healthScore){return 1}
            return 0})
            return{
            ...state,
          recipes:arrayorderscore
          }  
          case "CREATE_RECIPES":
            return{
              ...state,
                  }

           case 'GET_DIET_TYPES':
          return{
                ...state,
                dietTypes: action.payload
            }
       
        

       default:
      return state;
  }
};

export default reducer;



