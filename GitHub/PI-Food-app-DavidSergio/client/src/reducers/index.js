const initialState = {
    recipes: [],
    recipesByName: [],
    recipeById: {},
    diets: [],
    dietTypes:[],
    switchloading:false,
   

   
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
              action.payload==="az"?
              state.recipes.sort(function(a,b){
                if(a.title.toLowerCase()>b.title.toLowerCase()){return 1}
                if(a.title.toLowerCase()<b.title.toLowerCase()){return -1}
                return 0}) :  
                state.recipes.sort(function(a,b){
                if(a.title.toLowerCase()>b.title.toLowerCase()){return -1}
                if(a.title.toLowerCase()<b.title.toLowerCase()){return  1}
                return 0})
             
                
        case "ORDER_RECIPE_BY_HSCORE":
          action.payload==='worst'?
          state.recipes.sort(function(a,b){
            if(a.healthScore>b.healtScore){return 1}
            if(a.healthScore<b.healthScore){return -1}
            return 0}) : state.recipes.sort(function(a,b){
              if(a.healthScore>b.healthScore){return -1}
              if(a.healthScore<b.healthScore){return 1}
            return 0})
         
          case "CREATE_RECIPES":
            return{
              ...state,
                  }
          case 'GET_RECIPES_CREATE':
            return{
              ...state,
              recipes: action.payload,
            }
          case 'GET_RECIPES_API':
            return{
                ...state,
                recipes: action.payload,
              }
            case 'DELETE_RECIPES':
              return{
                ...state
                
              }
              case 'SWICH_LOADING':
              return{
                ...state,
                switchloading: action.payload,
              }

           case 'GET_DIET_TYPES':
          return{
                ...state,
                dietTypes: action.payload,
            }
       
        

       default:
      return state;
  }
};

export default reducer;





