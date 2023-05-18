import React, { useState, useEffect } from 'react';
//import MemeEditor from './MemeEditor';
import Encab from './Encab';
import Pie from './Pie';
import { Link } from 'react-router-dom';
//import { useHref } from 'react-router-dom';

function AppMeme() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  //const [showMemeEditor, setShowMemeEditor] = useState(false); // Estado para mostrar/ocultar el componente MemeEditor
  const IMAGES_PER_PAGE = 12;

  // Obtener los templates de la API al cargar el componente
  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => response.json())
      .then((data) => setTemplates(data));
  }, []);

  // Generar la URL de la imagen a partir del template y los textos
 function generateImageUrl() {
    if (!selectedTemplate) {
      return '';
    }
    return `https://api.memegen.link/images/${selectedTemplate.id}/${topText}/${bottomText}`;
  } 

 /**  function generateImageUrl() {
    if (!selectedTemplate) {
      return '';
    }
  
    // Verificar si se han ingresado textos
    if (topText.trim() === '' && bottomText.trim() === '') {
      return `https://api.memegen.link/images/${selectedTemplate.id}`;
    }
  
    // Generar la URL con los textos ingresados
    return `https://api.memegen.link/images/${selectedTemplate.id}/${topText}/${bottomText}`;
  }*/
  
  

  // Descargar la imagen generada
  async function downloadImage() {
    const imageUrl = generateImageUrl();
  
    // Fetch the image data and convert it to a blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
  
    // Create an object URL from the blob
    const url = URL.createObjectURL(blob);
  
    // Create a link and set the object URL as the href
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meme.png';
    link.rel = 'noopener noreferrer';
  
    // Add the link to the DOM and click it to download the image
    document.body.appendChild(link);
    link.click();
  
    // Release the object URL and remove the link from the DOM
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  //función para obtener las imágenes que corresponden a la página actual
  function getCurrentImages() {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    return templates.slice(startIndex, endIndex);
  }

  //para agregar botones
  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  
  function handleNextPage() {
    const lastPage = Math.ceil(templates.length / IMAGES_PER_PAGE);
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  }

 
  
  //para cambiar leyenda de foto original, eliminar si no funciona
  const handleInputChange = (e, type) => {
    if (type === 'top') {
      setTopText(e.target.value);
    } else if (type === 'bottom') {
      setBottomText(e.target.value);
    }
  }

  // Función para mostrar/ocultar el componente MemeEditor
 // const handleShowMemeEditor = () => {
 //   setShowMemeEditor(true);
  //};

  return ( 
    
    <div className=" AppEstilo my-3">
      <Encab/>
      <div className='container'>
        <div className=" row mt-3">
          <div className="col-lg-3 ">
            <h4 className='mb-5'>Generador de memes</h4>
            {selectedTemplate && (
              <div className="mb-3">
                <img src={generateImageUrl()} alt="" className="img-fluid" width="200rem" height="auto" crossorigin="anonymous" /> {/* Agregar crossorigin */}
              </div>
            )}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                downloadImage();
              }}
            >
              <div className="mb-3">
                <label htmlFor="topText" className="form-label">
                  Texto superior
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="topText"
                  value={topText}
                  onChange={(e) => handleInputChange(e, 'top')}
            /**   onChange={(event) => setTopText(event.target.value)}     version anterior*/
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bottomText" className="form-label">
                  Texto inferior
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bottomText"
                  value={bottomText}
                  onChange={(e) => handleInputChange(e, 'bottom')}
            /**    onChange={(event) => setBottomText(event.target.value)}   version anterior */ 
                />
              </div>
              <div className='d-flex justify-content-between'>
                <div> 
                  <button type="submit" className="btn btn-primary boton-fm">
                    Descargar
                  </button>
                </div>  
                <div>
                    <button type="button" className="btn btn-primary mx-1 boton-fm">
                      <Link to="/MemeEditor" class="text-decoration-none text-white"> Subir Foto</Link>
                    </button>

                </div>
            {/**    {showMemeEditor && <MemeEditor />}*/} 
              </div>
            </form>
          </div>
          <div className="col-lg-9 ">
            <h4 className='mb-5'>Selecciona una Imágen</h4>
            <div className="row row-cols-3 g-3 ">
              {getCurrentImages().map((template) => (
                <div className="col d-flex justify-content-center" key={template.id}>
                  <img
                  src={`https://api.memegen.link/images/${template.id}/ejemplo.jpg`}
                  // src={template.url}
                    alt={template.name}
                    className="img-fluid cursor-pointer "
                    onClick={() => setSelectedTemplate(template)}
                  />
                </div>
              ))}

            </div>

            <div className="d-flex justify-content-center my-3">
              <button
                type="button"
                className="btn btn-secondary mx-1"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-1"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(templates.length / IMAGES_PER_PAGE)}
              >
                Siguiente
              </button>
            </div>

          </div>
        </div>
      </div>
      <Pie/>
    </div>
  );
}
export default AppMeme;