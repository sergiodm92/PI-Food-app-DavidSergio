
import { Route } from 'react-router-dom';

import './App.css';

import LandingPage from "./components/LandingPage/LandingPage";

import Form from "./components/Form/Form"
import Details from './components/Details/Details';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
  
    
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/recipe' component={Form} />
      <Route exact path='/recipes/:id' component={Details} />
      
   

      
    </div>
  );
}

export default App;


