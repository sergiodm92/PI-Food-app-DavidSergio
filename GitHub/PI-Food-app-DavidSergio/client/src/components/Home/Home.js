import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes,getRecipesForDiet,orderByName, orderByHScore} from "../../actions/index"
import {Link} from 'react-router-dom';
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import './Home.css';


export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector ((state)=>state.recipes);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [RecipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = (CurrentPage * RecipesPerPage);
    const indexOfFirstRecipe = (indexOfLastRecipe - RecipesPerPage);
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);
    const [order,setorder] = useState ("")
    const [orderscore , setorderscore] = useState(1)
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)}
        
        useEffect(() => {
            dispatch(getRecipes())
            
                
        }, [dispatch]);
        
      
                     

        function handleClick(e){
            e.preventDefault(); //evita que se recargue y se rompa la pagina
            dispatch(getRecipes())
        }
    
        function filterfordiet(e){
            if(e.target.value === 'All'){ 
                dispatch(getRecipes())
            } 
            else{
                dispatch(getRecipesForDiet(e.target.value))
                setCurrentPage((pag)=> pag = 1)
            }
        }

        function orderforName(e){
            if(e.target.value === 'default'){
                dispatch(getRecipes())
            } 
            else{
                e.preventDefault();
                dispatch(orderByName(e.target.value))
                setorder(`ordenado ${e.target.value}`)
                setCurrentPage((pag)=> pag = 1)
            }
        }

        function orderforHScore(e){
            if(e.target.value === 'default'){
                dispatch(getRecipes())
            } 
            else {
                e.preventDefault();
                dispatch(orderByHScore(e.target.value))
                setorderscore(`ordenadopscore ${e.target.value}`)
                setCurrentPage((pag)=> pag = 1)
            }
        }

        return(
            <div className="wphome">
                <div className="upperbar">
                    <div className="divbuttonbar">
                        <Link to='/recipe' className='link'>
                            <button className="buttonhome" >Create Recipe</button>
                        </Link> 
                    </div>
                    <div className="divbuttonbar">
                        <select  onChange={e=> orderforName(e)}>
                            <option value='default'>By name...</option>
                            <option value='az'>A-Z</option>
                            <option value='za'>Z-A</option>
                        </select>
                    </div>
                    <div className="divbuttonbar">
                        <select  onChange={e=> orderforHScore(e)}>
                            <option value='default'>By score...</option>
                            <option value='best'>Best Score</option>
                            <option value='worst'>Worst Score</option>
                        </select>
                    </div>
                    <h2 className="hometitle">FIND YOUR RECIPE</h2>
                    <div className="divbuttonbar">
                        <select onChange={e=>  filterfordiet(e)}>
                            <option value='All'>By diet...</option>
                            <option value='Gluten Free'>Gluten free</option>
                            <option value='Ketogenic'>Ketogenic</option>
                            <option value='Vegetarian'>Vegetarian</option>
                            <option value='lacto ovo vegetarian'>lacto-Ovo-Vegetarian</option>
                            <option value='Vegan'>Vegan</option>
                            <option value='Pescatarian'>Pescatarian</option>
                            <option value='Paleo'>Paleo</option>
                            <option value='Primal'>Primal</option>
                            <option value='fodmap friendly'>fodmap-friendly</option>
                            <option value='Whole 30'>Whole30</option>
                        </select>
                    </div>   
                    <div className="divbuttonbar">
                        <button className="buttonhome" onClick={(e)=>{handleClick(e)}}>Default</button>
                    </div>
                    <Search
                        setCurrentPage={setCurrentPage}
                    />   
                </div>
                <div>
                    <div className="divpag">
                    
                        <Pagination className ="pagination"
                            RecipesPerPag={RecipesPerPage}
                            allRecipes={allRecipes.length}
                            pagination = {pagination}
                            
                        />
                    </div>
                <div className='recipes-home'>
				{ currentRecipes ? (currentRecipes.map( e => {
                    return(
                        <Card   
                            image={e.image} 
                            title={e.title} 
                            score={e.score} 
                            healthScore={e.healthScore} 
                            diets={e.diets}
                            id={e.id}
                            readyInMinutes={e.readyInMinutes}
                           
                        />
                    )
                })
				) : (
					<h6>Recipes not found! Try again.</h6>
				    )}
			    </div>
          
                        
                
            </div>
        </div>
    )

}
