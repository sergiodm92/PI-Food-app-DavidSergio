import React from "react";
import "./stylePagination.css"


export default function Pagination({RecipesPerPag, allRecipes, pagination, CurrentPage}){
    const pageNumbers = []
    const reset=false
    const numbers = Math.ceil(allRecipes/RecipesPerPag)
    for(let i=1; i<= numbers; i++){
        pageNumbers.push(i)
    }
    pageNumbers.push(">")
    if(CurrentPage===numbers)pageNumbers.pop()
    pageNumbers.unshift("<")
    if(CurrentPage===1)pageNumbers.shift()


    return(
        <div className="pagination2" >
                
                    {   
                        
                        pageNumbers && 
                        pageNumbers.map(Number=>{ return(
                            
                            <div className="number" key={Number}>
                            <a onClick={()=>pagination(Number)}>
                            {Number===CurrentPage?(<p className="currentNamber">{Number}</p>):Number} </a>
                            </div>)
                        })}
                
        </div>
    )
}

