import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes,getRecipesForDiet,orderByName, orderByHScore,recipesCreate, recipesapi, swich_loading} from "../../actions/index"
import {Link} from 'react-router-dom';
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Loading from '../Loading/Loading';
import './Home.css';


export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector ((state)=>state.recipes);
    const SwichL = useSelector ((state)=>state.switchloading)
    const [CurrentPage, setCurrentPage] = useState(1);
    const [RecipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = (CurrentPage * RecipesPerPage);
    const indexOfFirstRecipe = (indexOfLastRecipe - RecipesPerPage);
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);
    const [order,setorder] = useState ("")
    const [orderscore , setorderscore] = useState(1)
    const recipescreate = [];
    const pagination = (pageNumber) => {
        if(pageNumber==="<" )setCurrentPage(CurrentPage-1)
        else if(pageNumber===">")setCurrentPage(CurrentPage+1)
        else setCurrentPage(pageNumber)}

        useEffect(() => {
            setTimeout(() => {
                dispatch(getRecipes())  
            }, 2000);
        }, [dispatch]);

        useEffect(()=>{
            setCurrentPage((pag)=> pag = 1)
        }, [allRecipes])


        if(allRecipes.length===0)dispatch(swich_loading(true))
        else if(allRecipes.length!==0)dispatch(swich_loading(false))    

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

        function selectcreate(e){
            if(e.target.value === 'all'){
                e.preventDefault();
                dispatch(getRecipes())
            }
            else if(e.target.value === 'create'){
                e.preventDefault();
                dispatch(recipesCreate())
                }
            else if(e.target.value === 'api'){
                    e.preventDefault();
                    dispatch(recipesapi())
                    }}



        return(
            <div className="wphome">
                <div className="upperbar">
                    
                    <div className="divbuttonbar">
                        <select className="selec" onChange={e=> orderforName(e)}>
                            <option key = 'default' value='default'>By name...</option>
                            <option key = 'az' value='az'>A-Z</option>
                            <option key = 'za' value='za'>Z-A</option>
                        </select>
                    </div>
                    <div className="divbuttonbar">
                        <select className="selec" onChange={e=> orderforHScore(e)}>
                            <option key = 'default' value='default'>By score...</option>
                            <option key = 'best' value='best'>Best Score</option>
                            <option key = 'worst' value='worst'>Worst Score</option>
                        </select>
                    </div>
                    <div className="createornotcreate">
                            <select className="selec" onChange={e=> selectcreate(e)}>
                            <option key = 'all' value='all'>All</option>
                            <option key = 'create' value='create'>create</option>
                            <option key = 'api' value='api'>api</option>
                            
                        </select>
                    </div>
                  
                    <div className="divbuttonbar">
                        <select className="selec" onChange={e=>  filterfordiet(e)}>
                            <option key = 'All' value='All'>By diet...</option>
                            <option key = 'Gluten Free' value='Gluten Free'>Gluten free</option>
                            <option key = 'Ketogenic' value='Ketogenic'>Ketogenic</option>
                            <option key = 'Vegetarian' value='Vegetarian'>Vegetarian</option>
                            <option key = 'lacto ovo vegetarian' value='lacto ovo vegetarian'>lacto-Ovo-Vegetarian</option>
                            <option key = 'Vegan' value='Vegan'>Vegan</option>
                            <option key = 'Pescatarian' value='Pescatarian'>Pescatarian</option>
                            <option key = 'Paleo' value='Paleo'>Paleo</option>
                            <option key = 'Primal' value='Primal'>Primal</option>
                            <option key = 'fodmap friendly' value='fodmap friendly'>fodmap-friendly</option>
                            <option key = 'Whole 30' value='Whole 30'>Whole30</option>
                        </select>
                    </div>   
                    <div className="divbuttonbar">
                        <button className="btn-search" onClick={(e)=>{handleClick(e)}}>Clean 🧹</button>
                    </div>
                    <div className="divbuttonbar">
                        <Link to='/recipe' className='link'>
                            <button className="btn-search" >Create Recipe</button>
                        </Link> 
                    </div>
                    <Search
                        setCurrentPage={setCurrentPage}
                    />   
                </div>
                
                    <div className="divpag">
                    {SwichL===false ? 
                        (<Pagination className ="pagination"
                            RecipesPerPag={RecipesPerPage}
                            allRecipes={allRecipes.length}
                            pagination = {pagination}
                            CurrentPage = {CurrentPage}
                            
                        />) : true
                    }
                    </div>
                <div className='recipes-home'>
                { SwichL===true ?  
                
                    <div className="loadd">
                        <Loading/>
                    </div>
                
                    : (currentRecipes.map( e => {
                    return(
                    <div>
                        <Card   
                            image={e.image} 
                            title={e.title} 
                            score={e.score} 
                            healthScore={e.healthScore} 
                            diets={e.diets}
                            id={e.id}
                            readyInMinutes={e.readyInMinutes}
                        />
                    </div>
                
                    
                    )}))
              
                }
                </div>

            
        
        </div>
    )

}
