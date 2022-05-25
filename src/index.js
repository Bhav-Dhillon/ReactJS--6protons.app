import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import { RedFormat } from 'three';
import Logo from './images/logo.png'

function Overlay()
{
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 27, left: 44, fontSize: '20px' }}>
        {/* <p>Test</p> */}
        <img src={Logo} style={{ width: 50, height: "auto" }} />
      </div>
      <div style={{ position: 'absolute', top: 40, left: 96, fontSize: '20px', fontWeight: 350 }}>6 Protons</div>
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        Dev
        <br />
        Dhillon
      </a>
      {/* <img src={heroImg} style={{ position: 'absolute', top: 75, left: '25%', pointerEvents: 'none', width: 750, height: 'auto' }} /> */}
      <div style={{ position: 'absolute', top: '58%', left: '15%', }}>
        <h1 style={{ margin: 0, padding: 0, fontSize: '6em', fontWeight: 500, letterSpacing: '-0.05em' }}>Learn Chemistry By Seeing.</h1>
      </div>

      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>05/2022</div>
    </div>
  )
}

ReactDOM.render(
  <>
    <App />
    <Overlay />
  </>,
  document.getElementById('root')
)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//     <Overlay />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
