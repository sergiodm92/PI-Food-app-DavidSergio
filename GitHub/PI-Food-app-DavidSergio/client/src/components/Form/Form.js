import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDiets, postRecipe } from "../../actions/index";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import './form.css';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import '../Home/Home.css'
import axios from 'axios';


const formData = {
  title: '',
  score: '',
  healthScore: '',
	instructions: '',
  summary: '',
  image:'',
  diets: [],
  readyInMinutes: ''
};


//validaciones
export const validate = (recipe) => {
  let error = {};

  if (!recipe.title) error.title = "title required";
  if (!recipe.summary) error.summary = "summary required";
  
  if (!recipe.instructions) error.instructions = "type an instruction";

  if (!/^([0-9])*$/.test(recipe.score)) error.score = "Score is not a number";
  else if (recipe.score < 0 || recipe.score > 100)
    error.score = "spoonacularScore must be between 0 and 100";

  if (!/^([0-9])*$/.test(recipe.healthScore))
    error.healthScore = "healthScore is not a number";
  else if (recipe.healthScore < 0 || recipe.healthScore > 100)
    error.healthScore = "healthScore must be between 0 and 100";

    if (!/^([0-9])*$/.test(recipe.readyInMinutes))
    error.healthScore = "Time is not a number";
  else if (recipe.readyInMinutes < 5 || recipe.readyInMinutes > 300)
    error.readyInMinutes = "Time must be between 5 and 300";

  if (recipe.diets.length === 0) error.diet = "select at least one diet";

  return error;
};

const Form = () => {
  const dispatch = useDispatch();

  const diets = useSelector((state) => state.diets);

  const [form, setForm] = useState(formData);
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    setError(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
        setForm({
            ...form,
            diets: [...form.diets, e.target.id],
        });
        console.log(form.diets.title);
    } else {
        setForm({
            ...form,
            diets: [...form.diets].filter((diet) => e.target.id !== diet),
        });
    }
};

  const handleSubmit = (e) => {
      e.preventDefault();

      if(
      !error.title && form.title &&
      !error.score && form.score &&
      !error.healthScore && form.healthScore &&
      !error.instructions && form.instructions &&
      !error.summary && form.summary &&
      !error.readyInMinutes && form.readyInMinutes &&
      form.diets.length){

        dispatch(postRecipe(form))
    

        swal({
            title: "Great!",
            text: "Recipe Created!",
            icon: "success",
            button: "Confirm",
          });
          
        setForm(formData);
      } else {
        swal({
            title: "Error",
            text: "Incorrect data, please try again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
      }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm(formData);
    setError({});
  };

  return (
    <div className='form-main-container'>
     <Link to='/home' className='link'>
    <button className="buttonhome" >Home</button>
    </Link>
      <div className='form-container'>
        
      <form className='form-div'>
      <div className='form-items'>
      <p className='form-title'>Create your own recipe!</p>
          <p className={error.title ? 'danger' : 'pass'}>🔻{error.title}</p>
          <input
            type="text"
            value={form.title}
            id="title"
            name="title"
            onChange={handleChange}
            placeholder="💬Title"
            className={error.title & 'danger'}
          />
          
          
          <p className={error.score ? 'danger' : 'pass'}>🔻{error.score}</p>
          <input
            type="text"
            value={form.score}
            id="score"
            name="score"
            onChange={handleChange}
            placeholder="⭐Score (0-100)"
            className={error.score & 'danger'}

          />

        <p className={error.healthScore ? 'danger' : 'pass'}>🔻{error.healthScore}</p>
          <input
            type="text"
            value={form.healthScore}
            id="healthScore"
            name="healthScore"
            onChange={handleChange}
            placeholder="🍏HealthScore (0-100)"
            className={error.healthScore & 'danger'}

          />
         <p className={error.readyInMinutes ? 'danger' : 'pass'}>🔻{error.readyInMinutes}</p>
          <input
            type="text"
            value={form.readyInMinutes}
            id="Time"
            name="readyInMinutes"
            onChange={handleChange}
            placeholder="🕐Time(minutes)"
            className={error.readyInMinutes & 'danger'}

          />
        <p className={error.summary ? 'danger' : 'pass'}>🔻{error.summary}</p>
          <textarea
            name="summary"
            id="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="🫕Summary"
            className={error.summary & 'danger'}

          ></textarea>
        <p className={error.instructions ? 'danger' : 'pass'}>🔻{error.instructions}</p>
          <textarea
            name="instructions"
            id="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="📄Instructions"
            className={error.instructions & 'danger'}
          ></textarea>
       
          <input
            type="text"
            value={form.image}
            id="image"
            name="image"
            onChange={handleChange}
            placeholder="💬Image(only link)"
            
          />
          </div>
          
          <div className='diets-container'>
              
            {diets.length > 0 &&
                diets.map((diet) => (
                  <label
											htmlFor={diet.id
												.toLowerCase()
												.replace(' ', '')
												.replace('-', '')}
                        className='text-label'
										>
                   
											<input
												id={diet.id
													.toLowerCase()
													.replace(' ', '')
													.replace('-', '')}
												type='checkbox'
												name={diet.title
													.toLowerCase()
													.replace(' ', '')
													.replace('-', '')}
												onChange={handleChecked}
											/>
											<span class='checkboxtext'> {diet.title} </span>
										</label>
                )) }
          </div>
       <div className='form-buttons'>
        <button onClick={handleReset} className='btn-reset'> <DeleteIcon /> </button>
        <button onClick={handleSubmit} className='btn-create'> <SendIcon /> </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Form;
