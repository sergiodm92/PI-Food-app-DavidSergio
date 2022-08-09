import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { getRecipesName, swich_loading} from "../../actions/index";
import './search.css'


export default function SearchBar() {
     const dispatch = useDispatch()
     const [name, setName] = useState('')
     const recipename = useSelector((state)=>state.recipesByName)
    


     function handleInputChange(e) {
        e.preventDefault(); 
        setName(e.target.value)
        console.log(name)
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        if(recipename.length===0)dispatch(swich_loading(true))
        else dispatch(swich_loading(false))
        dispatch(getRecipesName(name))
        if(recipename.length===0)dispatch(swich_loading(true))
        else dispatch(swich_loading(false))
        setName("");
        
      
       

    }


    return (

         
        <div >
       
        <form onSubmit={handleSubmit}>
            <input
			className='input-search'
            onChange={(e) => handleInputChange(e)}
            type= 'text'
            placeholder="Search..."
            value={name}
            />
            {/*<button  onClick={(e)=> handleSubmit(e)} type="submit">Buscar</button> */}
            <button className='btn-search' type="submit">🔎</button>
        {/* //</div> */}
        
        </form>
        {
            getRecipesName(name)}
        
        </div>
        
    )
}