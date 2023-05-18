import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemeEditor from './componentes/MemeEditor'
import AppMeme from './componentes/AppMeme';
//import { Switch } from 'react-router-dom';

//import logo from './logo-faby2.png';

//import Encab from './componentes/Encab';
//import Pie from './componentes/Pie';

 

function App() {
  return (
    <Router>  
      <Routes >
        
          <Route path="/" element={<AppMeme />} />
          <Route path="/MemeEditor" element={<MemeEditor />} />
        {/** <div >      <Encab/>
         <GifEditor/>  */} 
        {/** <MemeEditor/> 
              <AppMeme/>
              <Pie/></div>*/}
        
      </Routes>
    </Router> 

  );
}

export default App;
