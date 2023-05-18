import React, { useState, useRef, useEffect } from 'react';
import Encab from './Encab';
import Pie from './Pie';
import { Link } from 'react-router-dom';

function MemeEditor() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const maxWidth = 500; // Tamaño máximo para el lienzo
      const maxHeight = 500;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      // Set text styles
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.font = 'bold 36px Impact';
      ctx.textAlign = 'center';

      // Draw the top text
      ctx.fillText(topText, width / 2, 50);
      ctx.strokeText(topText, width / 2, 50);

      // Draw the bottom text
      ctx.fillText(bottomText, width / 2, height - 20);
      ctx.strokeText(bottomText, width / 2, height - 20);
    };
  }, [image, topText, bottomText]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'meme.png';
    link.click();
  };

  return (
    <div className='AppEstilo my-3'>
      <Encab/>
      <h2 className='pt-3'>Meme Editor</h2>
      <div className=' row mx-1'>
        <div className='col-lg mx-0'>
          <form>
            <h3>Elija la foto a subir</h3>
            <div className="form-group">
              <label htmlFor="imageUpload">Subir imagen:</label>
              <input type="file" className="form-control my-1" id="imageUpload" onChange={handleImageUpload} accept="image/*" />
            </div>
            <div className="form-group">
              <label htmlFor="topText">Texto Superior:</label>
              <input type="text" className="form-control my-1" id="topText" value={topText} onChange={handleTopTextChange} />
            </div>

            <div className="form-group">
              <label htmlFor="bottomText">Texto Inferior:</label>
              <input type="text" className="form-control my-1" id="bottomText" value={bottomText} onChange={handleBottomTextChange} />
            </div>

            <div className='d-flex justify-content-between my-5'>
              <div> 
                <button className="btn btn-primary  boton-fm" onClick={handleDownload}>Descargar Meme</button>
              </div>  
              <div>
                <button type="button" className="btn btn-primary mx-1 boton-fm">
                    <Link to="/" class="text-decoration-none text-white">Volver</Link>
                </button>
              </div>
            </div>

          </form>
        </div>
        <div className='col-lg mx-0'>
          <h3>Vista previa:</h3>
        
            {image && (
              <div>
                <canvas  ref={canvasRef} width="500" height="500" style={{ border: '1px solid black' }} />
              </div>
              
            )}
               
        </div>
      </div>
      <div className='my-3 h-25'></div>
      <Pie/>
    </div>
  );
}

export default MemeEditor;
