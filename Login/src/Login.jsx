import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import './Login.css'
import Forgotten from './Components/Forgotten.jsx'

function Login(){
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("password");
  const [eye, setEye] = useState("../public/eye-close.png");
  const [popUp, setPopUp] = useState(false);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);

  const sourceDivRef = useRef(null);
  const targetDivRef = useRef(null);


  const handleButtonClick = (isSubmit) => {
    setIsSubmit(isSubmit);
  };

  const handlePasswordClick = (isVisible) => {
    if (isVisible){
      setPassword("text");
      setEye("../public/eye-open.png");
      setIsVisible(isVisible);
    } else {
      setPassword("password");
      setEye("../public/eye-close.png");
      setIsVisible(isVisible);
    }
  };

  useEffect(() => {
    const updateTargetSize = () => {
      if (sourceDivRef.current && targetDivRef.current) {
        const sourceWidth = sourceDivRef.current.offsetWidth;
        const sourceHeight = sourceDivRef.current.offsetHeight;
        setTargetWidth(sourceWidth);
        setTargetHeight(sourceHeight);
      }
    };


    updateTargetSize();
    window.addEventListener("resize", updateTargetSize);

    return () => window.removeEventListener("resize", updateTargetSize);
  }, []);


  return (
    <div className="All">
      <div className="Information" ref={sourceDivRef}>
        <p style={{fontSize: "4vh"}}>Inicio de Sesion</p>
        <form>
          <div className='Form'>
            <div className='Correo'> 
              <p style={{fontSize: "3vh"}}>Correo</p>
              <div className='CorreoInput'><input pattern=".*@correo.unimet.edu.ve" required = {isSubmit} style={{fontSize: "3vh", padding:"10px", paddingLeft:"20px"}}/></div> 
            </div>
            <div className='Contrasena'>
              <div className='ContrasenaText'>
                <p style={{fontSize: "3vh"}}>Contraseña</p>
                <img onClick={() => handlePasswordClick(!isVisible)} alt="eye" src={eye} style={{width: "2.5vw", height:"2.5vw", cursor:"pointer"}}/>
              </div>
              <div className='ContrasenaInput'><input 
                  required = {isSubmit} style={{fontSize: "3vh", padding:"10px", paddingLeft:"20px"}} type= {password}
                  minLength="6" maxLength="8"/>
              </div>
              <button className='Forget' style={{cursor:"pointer", fontSize:"1vw", color:"rgb(87, 86, 86)"}}onClick={() => {handleButtonClick(false); setPopUp(true);}}>Olvidaste tu contraseña?</button>
              <Forgotten trigger={popUp}width={ (targetWidth + targetWidth)} height={targetHeight} setTrigger={setPopUp}/>
            </div>
            <div className='Buttons'>
              <button className='Login' type="submit" onClick={() => handleButtonClick(true)}> Iniciar Sesion </button>
              <button className='Register' style={{cursor:"pointer"}}onClick={() => handleButtonClick(false)}>No tienes cuenta? Registrate aqui </button>
            </div>
            <div className='Option'>
                <p style={{fontSize: "3vh", textAlign:"center"}}>Tambien</p>
            </div>
            <div className='Google' >
              <button type="button" className="GoogleButton" >Inicia Sesion con Google </button>
            </div>
          </div>
        </form>
      </div>
      <div className="Photo" ref={targetDivRef} style={{ width: targetWidth, height: targetHeight }}>
        <img className="Inicio" alt="Inicio" src="https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-1024x683.jpg" style={{height: targetHeight }}/>
      </div>
    </div>
  )
}

export default Login
