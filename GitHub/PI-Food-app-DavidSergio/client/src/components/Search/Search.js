// import React from 'react'
// import {useState} from 'react';
// import { useDispatch } from 'react-redux';
// import {getRecipesName} from '../../actions/index.js';

// import './search.css'

// export default function Search() {
// 	const dispatch = useDispatch();
// 	const [title, settitle] = useState('');
	
// 	function handleChange(e) {
// 		settitle(e.target.value);
// 	}

// 	function handleSubmit(e) {
// 			e.preventDefault();
// 			dispatch(getRecipesName(title));
			
// 	}

// 	return (
// 		<React.Fragment>
			
// 				<div className='box'>
// 				<input
// 					className='input-search'
// 					type='text'
// 					placeholder='Search your recipe'
// 					onChange={(e)=>handleChange(e)}
// 				/>
// 				<button 
// 				className='buttonhome' 
// 				type='submit' 
// 				onClick={(e)=>handleSubmit(e)}>
// 			submit
// 				</button>
// 				</div>
		
// 		</React.Fragment>
// 	);
// }

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'; 
import { getRecipesName} from "../../actions/index";
import './search.css'


export default function SearchBar({setCurrentPage}) {
     const dispatch = useDispatch()
     const [name, setName] = useState('')


     function handleInputChange(e) {
        e.preventDefault(); 
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesName(name))
        setName("");
        setCurrentPage(page=>page=1)
      
       

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
            <button className='buttonhome' type="submit">🔎</button>
        {/* //</div> */}

        </form>
        {getRecipesName(name)}
        </div>
    )
}