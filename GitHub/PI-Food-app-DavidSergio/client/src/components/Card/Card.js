
import React from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { BsHeartFill, BsHeartHalf, BsHeart} from 'react-icons/bs'
import {deleteRecipe, getRecipes} from '../../actions/index'
import {useDispatch, useSelector} from "react-redux";

import './Card.css'

const Card = ({ id, score, healthScore, image, title, diets, readyInMinutes}) => {
    
    const dispatch = useDispatch();
    let scoreStar = [];
    let scoreHeart = [];
    let scoreStarTotal = [];
    let scoreHeartTotal = [];
    let totalStar = (10 - Math.floor(score / 10)) - (score % 10 > 0 ? 1 : 0);
    let totalHeart = (10 - Math.floor(healthScore / 10)) - ((healthScore % 10 > 0) ? 1 : 0);
    for (let i = 0; i < Math.floor(score / 10); i++) {
        scoreStar.push(i);
    };
    for (let i = 0; i < Math.floor(healthScore / 10); i++) {
        scoreHeart.push(i);
    };
    for (let i = 0; i < totalStar; i++) {
        scoreStarTotal.push(i);
    };
    for (let i = 0; i < totalHeart; i++) {
        scoreHeartTotal.push(i);
    };

    const getDiets = function () {
		let arrayDiets = [];
		if (diets) {
			for(let diet of diets) {
				typeof diet === 'object' ? arrayDiets.push(diet.title) : arrayDiets.push(diet);
			}
		}
		return arrayDiets.length ? arrayDiets.join(',') : 'not found'
	}

    const buttonx = function(){
        if (id.toString().includes("-")) return(<button className='buttonX' onClick={(e)=>{ handleClick(e)}}>x</button>)
    }

    function handleClick(e){
        e.preventDefault(); //evita que se recargue y se rompa la pagina
        dispatch(deleteRecipe(id))
    }
        


    
    return (
    <div className='container'>
        
            <div className='card' >
            <div className='divbutton'>{buttonx()}</div>       
            
            <Link className='link' to={`/recipes/${id}`}> 
                <div className='card-image'>
                
                <img src={image} alt="not found" />  
                </div> 
                
                <div className='card-text' >
                <h6 className="titlec">{title}</h6>

                <h4 className='card-diets'>{getDiets()}</h4>
                     </div>

                    <div className='card-stats'>
                 
                    <div className="stat2" >
                        {scoreHeart.map(e => <BsHeartFill />)}
                        {(healthScore % 10 > 0) && <BsHeartHalf />}
                        {scoreHeartTotal.map(e => <BsHeart />)}
                        <p className='text-stats'>  Health Score:  {healthScore}</p>
                        <p className='text-stats'>🕐Time: {readyInMinutes} minutes</p>
                     
                    </div>


                </div>
                </Link>
            </div>
       
    </div>
    );
};

export default Card;



