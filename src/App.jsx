import { useState, Suspense, useRef, useEffect} from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, Html, MeshWobbleMaterial} from '@react-three/drei'
import * as random from "maath/random";
import { useSpring, a } from "react-spring/three"
// import CardAn from './cardAn';

// Imported Components
import Hero from './components/Hero'
import TestModel from './components/TestModel.jsx'
import * as THREE from 'three'




export default function App() {

  // STATE AND HANDLERS
  const [page, setPage] = useState('home');

  // Refactor these into a single object
  const [flipped, setFlipped] = useState(false);
  const [clicked, setClicked] = useState(false);

  function rotateModel()
  {
    setFlipped(!flipped);
  }


  return (
    <>
      {/* OVERLAYS  */}
      { clicked ? <LessonSelectionOverlay /> : <Hero />}






      {/* BUTTONS */}
      <div className="btn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} style={clicked ? {marginTop: 100} : {marginTop: 0}} onClick={() => {
        setClicked(!clicked)
      }}>
        <div><a title={clicked ? "Back to Home" : "Get Started"}></a></div>
      </div>







      {/* 3D SCENE */}
      <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <spotLight position={[10, 10, 10] } intensity={1}/>
          <ambientLight intensity={.4} />
          <TestModel flipped={flipped}/>
          <Stars clicked={clicked}/>
        </Suspense>
      </Canvas>
    </>
  );
}



function Stars(props)
{
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 2.5 }))

  useFrame((state, delta) =>
  {
    // Rotating Stars:
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15

    // Camera zoom-in animation on load: 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, 0.07)

    // Rotating camera on button click:
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (props.clicked ? (Math.PI) : 0), 0.05)

  })

  return (
    <>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#fff" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    </>
  )
}


function LessonSelectionOverlay()
{
  function Card() 
  {
    const frame = useRef();
    const card = useRef(); 
    const light = useRef();

    function mouseMove(e)
    { 
      let { x, y, width, height } = frame.current.getBoundingClientRect()
      const left = e.clientX - x
      const top = e.clientY - y
      const centerX = left - width / 2
      const centerY = top - height / 2
      const d = Math.sqrt(centerX ** 2 + centerY ** 2)
  
      card.current.style.boxShadow = `
      ${-centerX / 5}px ${-centerY / 10}px 10px rgba(248, 248, 248, 0.689)`
  
      card.current.style.transform = `
      rotate3d(${-centerY / 5}, ${centerX / 5}, 0, ${d / 12}deg)`
  
      light.current.style.backgroundImage = `
      radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
    }
  
    function mouseLeave()
    {
      frame.current.removeEventListener('mousemove', mouseMove)
      card.current.style.boxShadow = ''
      card.current.style.transform = ''
      light.current.style.backgroundImage = ''
    }

    return (
      <div className="frame" onMouseMove={mouseMove} onMouseLeave={mouseLeave} ref={frame}>
        <div className="card" ref={card}>
          <div className="light" ref={light}></div>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <div className='lessonSelection-wrapper'>
        <h1 className='lessonSelection--title'>Please select a lesson.</h1>
        <div className='card--wrapper'>
          <Card id={0}/>
          <Card id={1}/>
          <Card id={2}/>
        </div>
      </div>
    </>

  )
}