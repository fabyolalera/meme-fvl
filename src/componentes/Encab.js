import React from 'react';
import '../App.css';
import logo from '../logo-faby2.png';

//import MemeEditor from './componentes/MemeEditor';
//import AppMeme from './componentes/AppMeme';
 

const Encab=()=> {
  return (
    
    <div className="Encab">

      <div class="encabezado d-flex justify-content-between p-0 ">
          <div className="logo-container">
            <img src={logo} width="80rem" height="auto" alt="logo" className="logo" />
          </div>
          <div>
            <h2 className='pt-4'>EDITOR DE MEMES</h2>
          </div> 
          <div></div>
      </div>
  
    </div>
  );
}

export default Encab;
